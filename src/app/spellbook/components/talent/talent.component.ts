import { Component, OnInit, Input } from "@angular/core";
import { Hero } from "@core/models/entity/entity";
import { Talent } from "@core/models/talent/talent.model";
import { AppState } from "@core/models";
import { Store } from "@ngrx/store";
import { GameStateUpdateHeroAction } from "@core/models/game-state/game-state.action";

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
            return;
        //reset all talent of level
        this.hero = {
            ...this.hero,
            talents: [...this.hero.talents].map((t) => {
                if (t.levelRequired === talent.levelRequired) {
                    t = { ...t, selected: false };
                    if (t.name === talent.name) {
                        t = { ...t, selected: !talent.selected };
                    }
                }
                return t;
            }),
        };
        //change
        this.store.dispatch(new GameStateUpdateHeroAction(this.hero));
    }

    trackByFn(index: number, el: Talent) {
        return index;
    }
    constructor(private store: Store<AppState>) {}

    ngOnInit(): void {}
}
