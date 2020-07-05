import { getNumberFixed } from "@core/models/utils";
import { first } from "rxjs/operators";
import {
    Currency,
    ITemplateBaseItem,
    ITemplateBaseEquipment,
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
import { Injectable, EventEmitter } from "@angular/core";
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
import { levelUpFromCombat } from "@core/models/level";
import { NotifierService } from "./notifier.service";
import { getFromLootbag } from "@core/models/loot/item-generation";
import { Potion } from "@core/models/potions/potions.model";
import { getEffect } from "@core/models/potions/potions.utils";
import { availableSlot } from "@core/models/selector";
import { NotificationType } from "app/notification/notification.model";

@Injectable({
    providedIn: "root",
})
export class CombatService {
    hero: Hero;
    fighter: Fighter;
    isFigthing: boolean;
    spellCasted = new EventEmitter<boolean>();
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
                potion:
                    this.hero.potion !== undefined
                        ? { ...this.hero?.potion, isInCooldown: false }
                        : undefined,
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
            let multCrit = 1;
            let damage: number = getHeroDamage(this.hero);
            let text: NotificationType = `damage`;
            if (isCrit(this.hero)) {
                multCrit = getMultiplier("ferocity", this.hero, 2);
                damage = damage * multCrit;
                text = `damageCrit`;
            }
            this.fighter.hp = getNumberFixed(this.fighter.hp - damage);
            this._notifier.notify(
                "text",
                text,
                damage,
                weapon.speed / 2,
                null,
                null,
                null
            );
            //heal after hit
            this.store.dispatch(
                new GameStateUpdateHeroAction(
                    lifeSteal(this.hero, damage, this._notifier)
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
                    hp: getNumberFixed(this.hero.hp - this.fighter.attack),
                })
            );
            if (this.hero.hp <= 0) {
                this.death();
            }
        });
    }

    launchSpell(hero: Hero) {
        hero.equippedSpell.forEach((s) => this.activateSpell(s));
    }

    startFight() {
        if (this.fighter === null) {
            this.stop();
            return;
        }
        this.fightIntervals.add(this.heroAttack());
        this.fightIntervals.add(this.fighterAttack());
        this.launchSpell(this.hero);
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
        this.spellCasted.emit(true);
        effectFor(
            spell,
            this.fighter,
            this.hero,
            isCrit(this.hero),
            this._notifier,
            this.store,
            () => {
                this.victory();
                this.death();
                return;
            }
        );
        this.store.dispatch(
            new CombatStateHeroSpell({ ...spell, isInCooldown: true })
        );
        this.fightIntervals.add(
            timer(
                getMultiplier("swiftness", this.hero, spell.cooldown * 1000)
            ).subscribe(() => {
                console.log("reset Cd");
                this.store.dispatch(
                    new CombatStateHeroSpell({ ...spell, isInCooldown: false })
                );
                if (this.isFigthing) {
                    console.log("spell activated");
                    this.activateSpell(spell);
                }
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
                levelUpFromCombat(
                    this.hero,
                    this.fighter,
                    this._notifier,
                    this.store
                )
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
                        "1icon",
                        "reward.earn",
                        "",
                        3000,
                        null,
                        [rwd.reward as Currency],
                        ""
                    );
                    break;
                case "armor":
                case "weapon":
                    this.store
                        .select(availableSlot)
                        .pipe(first())
                        .subscribe((available: number) => {
                            rwd.reward = rwd.reward as ITemplateBaseEquipment;
                            if (available <= 0) {
                                this._notifier.notify(
                                    "1icon",
                                    "inventoryFull",
                                    `${rwd.reward.type}.${rwd.reward.subType}`,
                                    3000,
                                    rwd.reward as ITemplateBaseItem
                                );
                                return;
                            }
                            this.store.dispatch(
                                new GameStateInventoryAddItemAction(
                                    rwd.reward as ITemplateBaseItem
                                )
                            );
                            this._notifier.notify(
                                "1icon",
                                "reward.earn",
                                "",
                                3000,
                                rwd.reward as ITemplateBaseItem,
                                null,
                                ""
                            );
                        });
                    break;
            }
        } else {
            this._notifier.notify("text", "noReward", "");
        }
    }
}
