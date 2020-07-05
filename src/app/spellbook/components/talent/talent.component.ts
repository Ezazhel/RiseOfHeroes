import { Component, OnInit, Input } from "@angular/core";
import { Hero } from "@core/models/entity/entity";
import { Talent } from "@core/models/talent/talent.model";
import { AppState } from "@core/models";
import { Store } from "@ngrx/store";
import { GameStateUpdateHeroAction } from "@core/models/game-state/game-state.action";
import { updateInsert, update } from "@core/models/utils";
import { Buff } from "@core/models/game-data/game-data.model";
import { getEffect } from "@core/models/talent/talent.utils";
import { AddBuffToStat, getHeroMaxHp } from "@core/models/entity/entity.utils";

@Component({
    selector: "app-talent",
    templateUrl: "./talent.component.html",
    styleUrls: ["./talent.component.scss"],
})
export class TalentComponent implements OnInit {
    @Input() hero: Hero;
    levelTalent: number[] = [10, 20, 30, 40, 50];

    getTalentForLevel(level: number) {
        return this.hero.talents.filter((t) => t.levelRequired === level);
    }

    selectTalent(talent: Talent) {
        if (
            this.hero.hp !== this.hero.maxHp ||
            this.hero.level < talent.levelRequired
        )
            return; //block changement of talent in combat
        //reset all talent of level
        const oldTalent = this.hero.talents.find(
            (t) => t.levelRequired === talent.levelRequired && t.selected
        );
        let unSelect: boolean = false;
        this.hero = {
            ...this.hero,
            talents: [...this.hero.talents].map((t) => {
                if (t.levelRequired === talent.levelRequired) {
                    t = { ...t, selected: false };
                    if (t.name === talent.name) {
                        unSelect = talent.selected;
                        t = { ...t, selected: !talent.selected };
                    }
                }
                return t;
            }),
        };
        //Add Bonus
        let buffs = [...this.hero.buffsStats];

        if (oldTalent !== undefined || unSelect) {
            const oldTalentEffect = getEffect(oldTalent);
            buffs = update<Buff>(
                buffs,
                (b: Buff) => b.type === oldTalent.bonus,
                (b: Buff) => ({
                    ...b,
                    add: b.add - oldTalentEffect.add,
                    mult: b.mult - oldTalentEffect.mult,
                })
            );
            //remove
        }
        if (!unSelect) {
            const talentEffect = getEffect(talent);
            buffs = updateInsert<Buff>(
                buffs,
                (b: Buff) => b.type === talent.bonus,
                (b: Buff) => ({
                    ...b,
                    add: b.add + talentEffect.add,
                    mult: b.mult + talentEffect.mult,
                }),
                talentEffect
            );
        }
        const stats = [...this.hero.baseStats].map((s) => ({
            ...s,
            value: AddBuffToStat(s.value, s.type, {
                ...this.hero,
                buffsStats: buffs,
                level: this.hero.level,
            }),
        }));
        const maxHp = getHeroMaxHp(
            stats.find((s) => s.type == "endurance").value
        );
        this.store.dispatch(
            new GameStateUpdateHeroAction({
                ...this.hero,
                stats,
                maxHp,
                hp: maxHp,
                buffsStats: buffs,
            })
        );
    }

    trackByFn(index: number, el: Talent) {
        return index;
    }
    constructor(private store: Store<AppState>) {}

    ngOnInit(): void {}
}
