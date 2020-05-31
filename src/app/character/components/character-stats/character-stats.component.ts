import { Store, select } from "@ngrx/store";
import { Component, OnInit, Input, Renderer2, ElementRef } from "@angular/core";
import { Observable } from "rxjs";
import { Hero } from "@core/models/entity";
import { AppState } from "@core/models";
import { heroSelector } from "@core/models/selector";
import { Stat } from "@core/models/game-data/game-data.model";
@Component({
    selector: "app-character-stats",
    templateUrl: "./character-stats.component.html",
    styleUrls: ["./character-stats.component.scss"],
})
export class CharacterStatsComponent implements OnInit {
    @Input() hero: Hero;

    trackBy(index: number, stat: Stat): string {
        return stat.type;
    }

    constructor() {}

    ngOnInit(): void {}
}
