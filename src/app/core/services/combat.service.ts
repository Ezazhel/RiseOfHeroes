import { descriptionFor, effectFor } from "@core/models/spells/spells.utils";
import {
    GameStateUpdateHeroAction,
    CombatStateHeroSpell,
    GameStateInventoryAddItemAction,
} from "./../models/game-state/game-state.action";
import { Hero, Fighter } from "./../models/entity";
import { Store } from "@ngrx/store";
import { Injectable } from "@angular/core";
import { AppState } from "@core/models";

import { getHeroDamage } from "@core/models/utils";
import { interval, Subscription, timer, BehaviorSubject, of } from "rxjs";
import {
    Spells,
    OvertimeSpells,
    HealSpells,
} from "@core/models/spells/spells.model";
import { take } from "rxjs/operators";
import { rewardXp, getXPForLevel, levelUp } from "@core/models/level";
import { generateReward } from "@core/models/item-generation";

@Injectable({
    providedIn: "root",
})
export class CombatService {
    hero: Hero;
    fighter: Fighter;
    isFigthing: boolean;
    fightIntervals = new Set();

    constructor(private store: Store<AppState>) {}

    initialize(hero: Hero) {
        this.hero = hero;
        if (!this.isFigthing) {
            this.isFigthing = true;
            this.fighter.hp = this.fighter.maxHp;
            this.fighter.debuffs?.forEach((d) => {
                clearTimeout(d.timeOut);
                clearInterval(d.interval);
            });
            this.fighter.debuffs = [];
            let equipped = [
                ...this.hero.equippedSpell,
            ].map((spell: Spells) => ({ ...spell, isInCooldown: false }));
            this.store.dispatch(
                new GameStateUpdateHeroAction({
                    ...this.hero,
                    hp: this.hero.maxHp,
                    equippedSpell: equipped,
                })
            );
            this.startFight();
        }
    }

    // Auto-attack interval.
    startFight() {
        let heroInterval = interval(
            this.hero.weapon ? this.hero.weapon.speed : 1000
        ).subscribe(() => {
            this.fighter.hp = Math.floor(
                this.fighter.hp - getHeroDamage(this.hero)
            );
            if (this.fighter.hp <= 0) {
                this.victory();
                this.death();
            }
        });
        let fighterInterval = interval(this.fighter.attackSpeed).subscribe(
            () => {
                this.store.dispatch(
                    new GameStateUpdateHeroAction({
                        ...this.hero,
                        hp: this.hero.hp - this.fighter.attack,
                    })
                );
                if (this.hero.hp <= 0) {
                    this.death();
                }
            }
        );
        this.fightIntervals.add(heroInterval);
        this.fightIntervals.add(fighterInterval);
    }
    stop() {
        this.fightIntervals.forEach((subscription: Subscription) => {
            subscription.unsubscribe();
        });
        this.fightIntervals.clear();
        this.isFigthing = false;
    }

    death() {
        this.stop();
        this.initialize(this.hero);
    }

    activateSpell(spell: Spells | OvertimeSpells | HealSpells) {
        effectFor(spell, this.fighter, this.hero);
        this.store.dispatch(
            new CombatStateHeroSpell({ ...spell, isInCooldown: true })
        );
        this.fightIntervals.add(
            timer(spell.cooldown * 1000).subscribe(() => {
                this.store.dispatch(
                    new CombatStateHeroSpell({ ...spell, isInCooldown: false })
                );
            })
        );
        if (this.fighter.hp <= 0) {
            this.victory();
            this.death();
        }
    }

    victory() {
        this.store.dispatch(
            new GameStateUpdateHeroAction(levelUp(this.hero, this.fighter))
        );
        //random loot from monster dropbag
        this.store.dispatch(
            new GameStateInventoryAddItemAction(
                generateReward(this.fighter.level, 2)
            )
        );
    }
}
