import {
    Component,
    OnInit,
    Input,
    ChangeDetectionStrategy,
} from "@angular/core";
import { Hero } from "@core/models/entity";

import { Stat } from "@core/models/game-data/game-data.model";
import {
    getHeroDps,
    getHeroOffensivePower,
    getHeroDamage,
    getHeroRune,
} from "@core/models/utils";
import { getXPForLevel } from "@core/models/level";
import { Rune, RuneType } from "@core/models/runes/runes.model";
@Component({
    selector: "app-character-stats",
    templateUrl: "./character-stats.component.html",
    styleUrls: ["./character-stats.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterStatsComponent implements OnInit {
    private _hero: Hero;
    @Input() set hero(value: Hero) {
        this._hero = value;
        this.runes = [...getHeroRune(value)];
    }
    get hero(): Hero {
        return this._hero;
    }
    runes: Rune[];
    getDps(): number {
        return getHeroDps(this.hero);
    }

    getOffensivePower(): number {
        return getHeroOffensivePower(this.hero);
    }
    getDamage(): number {
        return getHeroDamage(this.hero);
    }
    expNextLevel(level: number) {
        return getXPForLevel(level);
    }
    trackBy(index: number, stat: Stat): string {
        return stat.type;
    }

    trackByRune(index: number, rune: Rune) {
        return index;
    }
    constructor() {}

    ngOnInit(): void {}
}
