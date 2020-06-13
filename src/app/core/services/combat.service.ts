import { GameStateUpdateHeroAction } from "./../models/game-state/game-state.action";
import { Hero, Fighter } from "./../models/entity";
import { Store } from "@ngrx/store";
import { Injectable } from "@angular/core";
import { AppState } from "@core/models";

import { getHeroDamage } from "@core/models/utils";
import { interval, Subscription } from "rxjs";

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
            this.store.dispatch(
                new GameStateUpdateHeroAction({
                    ...this.hero,
                    hp: this.hero.maxHp,
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

    death() {
        this.fightIntervals.forEach((subscription: Subscription) => {
            subscription.unsubscribe();
        });
        this.fightIntervals.clear();
        this.isFigthing = false;
        this.initialize(this.hero, this.fighter);
    }
}
