import { first } from "rxjs/operators";
import {
    Currency,
    ITemplateBaseItem,
} from "@core/models/game-data/game-data.model";
import { effectFor } from "@core/models/spells/spells.utils";
import {
    GameStateUpdateHeroAction,
    CombatStateHeroSpell,
    GameStateInventoryAddItemAction,
    GameStateCurrenciesAddCurrencyAction,
    CombatStateHeroPotion,
} from "./../models/game-state/game-state.action";
import { Hero, Fighter } from "../models/entity/entity";
import { Store } from "@ngrx/store";
import { Injectable } from "@angular/core";
import { AppState } from "@core/models";
import {
    getHeroDamage,
    getMultiplier,
    isCrit,
    lifeSteal,
    findEquipment,
} from "@core/models/entity/entity.utils";
import { interval, Subscription, timer } from "rxjs";
import {
    Spells,
    OvertimeSpells,
    HealSpells,
} from "@core/models/spells/spells.model";
import { levelUp } from "@core/models/level";
import { NotifierService } from "./notifier.service";
import { getFromLootbag } from "@core/models/loot/item-generation";
import { Potion } from "@core/models/potions/potions.model";
import { getEffect } from "@core/models/potions/potions.utils";
import { availableSlot } from "@core/models/selector";

@Injectable({
    providedIn: "root",
})
export class CombatService {
    hero: Hero;
    fighter: Fighter;
    isFigthing: boolean;
    fightIntervals = new Set();

    constructor(
        private store: Store<AppState>,
        private _notifier: NotifierService
    ) {}

    initialize(hero: Hero) {
        this.hero = hero;
        if (!this.isFigthing) {
            this.isFigthing = true;
            this.resetFighter();
            this.initHero();

            this.startFight();
        }
    }
    private resetFighter() {
        this.fighter.hp = this.fighter.maxHp;
        this.fighter.debuffs?.forEach((d) => {
            clearTimeout(d.timeOut);
            clearInterval(d.interval);
        });
        this.fighter.debuffs = [];
    }

    private initHero() {
        let equipped = [...this.hero.equippedSpell].map((spell: Spells) => ({
            ...spell,
            isInCooldown: false,
        }));
        this.store.dispatch(
            new GameStateUpdateHeroAction({
                ...this.hero,
                hp: this.hero.maxHp,
                equippedSpell: equipped,
                potion: { ...this.hero?.potion, isInCooldown: false },
            })
        );
    }

    private heroAttack(): Subscription {
        const weapon = findEquipment(this.hero, "weapon");
        return interval(
            weapon.id !== "null"
                ? getMultiplier("swiftness", this.hero, weapon.speed)
                : getMultiplier("swiftness", this.hero, 1000)
        ).subscribe(() => {
            let crit: number = 1;
            let damage: number = getHeroDamage(this.hero);
            let text: string = `You hit for ${damage}`;
            if (isCrit(this.hero)) {
                crit = 2;
                text = `You critical hit for : ${damage * 2}`;
            }
            this.fighter.hp = Math.floor(this.fighter.hp - damage * crit);
            this._notifier.notify(text, "", "text", 0, 2000);
            //heal after hit
            this.store.dispatch(
                new GameStateUpdateHeroAction(
                    lifeSteal(this.hero, damage * crit, this._notifier)
                )
            );
            if (this.fighter.hp <= 0) {
                this.victory();
                this.death();
            }
        });
    }

    private fighterAttack() {
        return interval(this.fighter.attackSpeed).subscribe(() => {
            this.store.dispatch(
                new GameStateUpdateHeroAction({
                    ...this.hero,
                    hp: this.hero.hp - this.fighter.attack,
                })
            );
            if (this.hero.hp <= 0) {
                this.death();
            }
        });
    }
    startFight() {
        this.fightIntervals.add(this.heroAttack());
        this.fightIntervals.add(this.fighterAttack());
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
        effectFor(
            spell,
            this.fighter,
            this.hero,
            isCrit(this.hero),
            this._notifier,
            this.store
        );
        this.store.dispatch(
            new CombatStateHeroSpell({ ...spell, isInCooldown: true })
        );
        this.fightIntervals.add(
            timer(
                getMultiplier("swiftness", this.hero, spell.cooldown * 1000)
            ).subscribe(() => {
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

    usePotion(potion: Potion) {
        getEffect(potion, this.hero, this.store, this._notifier);
        this.store.dispatch(
            new CombatStateHeroPotion({ ...potion, isInCooldown: true })
        );
        this.fightIntervals.add(
            timer(
                getMultiplier("swiftness", this.hero, potion.cooldown * 1000)
            ).subscribe(() => {
                this.store.dispatch(
                    new CombatStateHeroPotion({
                        ...potion,
                        isInCooldown: false,
                    })
                );
            })
        );
    }

    victory() {
        this.store.dispatch(
            new GameStateUpdateHeroAction(
                levelUp(this.hero, this.fighter, this._notifier, this.store)
            )
        );

        //random loot from monster dropbag
        let rwd = getFromLootbag(this.fighter.level, this.fighter.lootbag);
        if (rwd != undefined) {
            switch (rwd.rewardType) {
                case "currency":
                    this.store.dispatch(
                        new GameStateCurrenciesAddCurrencyAction(
                            rwd.reward as Currency
                        )
                    );
                    this._notifier.notify(
                        (rwd.reward as Currency).name,
                        `currency ${(rwd.reward as Currency).name}`,
                        "reward",
                        (rwd.reward as Currency).quantity
                    );
                    break;
                case "armor":
                case "weapon":
                    this.store
                        .select(availableSlot)
                        .pipe(first())
                        .subscribe((available: number) => {
                            if (available <= 0) {
                                this._notifier.notify(
                                    `${
                                        (rwd.reward as ITemplateBaseItem)
                                            .quality
                                    } - ${
                                        (rwd.reward as ITemplateBaseItem).name
                                    } `,
                                    `   
                            ${(rwd.reward as ITemplateBaseItem).subType} 
                            ${(rwd.reward as ITemplateBaseItem).icon}
                        `,
                                    "inventoryFull"
                                );
                                return;
                            }
                            this.store.dispatch(
                                new GameStateInventoryAddItemAction(
                                    rwd.reward as ITemplateBaseItem
                                )
                            );
                            this._notifier.notify(
                                `${
                                    (rwd.reward as ITemplateBaseItem).quality
                                } - ${(rwd.reward as ITemplateBaseItem).name}`,
                                `   
                            ${(rwd.reward as ITemplateBaseItem).subType} 
                            ${(rwd.reward as ITemplateBaseItem).icon}
                        `,
                                "reward"
                            );
                        });
                    break;
            }
        } else {
            this._notifier.notify("", "", "noReward");
        }
    }
}
