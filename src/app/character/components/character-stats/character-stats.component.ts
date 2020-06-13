import { Component, OnInit, Input } from "@angular/core";
import { Hero } from "@core/models/entity";

import { Stat } from "@core/models/game-data/game-data.model";
import { toNumber } from "@ngneat/transloco";
import {
    getHeroDps,
    getHeroOffensivePower,
    getHeroDamage,
} from "@core/models/utils";
@Component({
    selector: "app-character-stats",
    templateUrl: "./character-stats.component.html",
    styleUrls: ["./character-stats.component.scss"],
})
export class CharacterStatsComponent implements OnInit {
    @Input() hero: Hero;

    getDps(): number {
        return getHeroDps(this.hero);
    }

    getOffensivePower(): number {
        return getHeroOffensivePower(this.hero);
    }
    getDamage(): number {
        return getHeroDamage(this.hero);
    }
    trackBy(index: number, stat: Stat): string {
        return stat.type;
    }

    constructor() {}

    ngOnInit(): void {}
}
