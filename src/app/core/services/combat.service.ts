import { descriptionFor } from "@core/models/spells/spells.utils";
import { GameStateUpdateHeroAction } from "./../models/game-state/game-state.action";
import { Hero, Fighter } from "./../models/entity";
import { Store } from "@ngrx/store";
import { Injectable } from "@angular/core";
import { AppState } from "@core/models";

import { getHeroDamage } from "@core/models/utils";
import { interval, Subscription, timer } from "rxjs";
import {
    Spells,
    OvertimeSpells,
    HealSpells,
} from "@core/models/spells/spells.model";

@Injectable({
    providedIn: "root",
})
export class CombatService {
    hero: Hero;
    fighter: Fighter;
    isFigthing: boolean;

    fightIntervals = new Set();
    constructor(private store: Store<AppState>) {}

    initialize(hero: Hero, fighter: Fighter) {
        this.hero = hero;
        this.fighter = fighter;
        if (!this.isFigthing) {
            this.isFigthing = true;
            this.fighter.hp = this.fighter.maxHp;
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
        this.initialize(this.hero, this.fighter);
    }

    activateSpell(spell: Spells | OvertimeSpells | HealSpells) {
        this.fighter.hp =
            this.fighter.hp - descriptionFor(spell, this.hero).param;
        let equipped = [...this.hero.equippedSpell];
        let index = equipped.findIndex((s: Spells) => s.id == spell.id);
        equipped[index] = { ...equipped[index], isInCooldown: true };
        this.store.dispatch(
            new GameStateUpdateHeroAction({
                ...this.hero,
                equippedSpell: equipped,
            })
        );
        this.fightIntervals.add(
            timer(equipped[index].cooldown * 1000).subscribe(() => {
                console.log("refresh cd");
                equipped = [...equipped];
                equipped[index] = { ...equipped[index], isInCooldown: false };
                this.store.dispatch(
                    new GameStateUpdateHeroAction({
                        ...this.hero,
                        equippedSpell: equipped,
                    })
                );
            })
        );
        if (this.fighter.hp <= 0) {
            this.death();
        }
    }
}
