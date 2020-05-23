import { Store, select } from "@ngrx/store";
import { Component, OnInit, Input } from "@angular/core";
import { Observable } from "rxjs";
import { Hero } from "@core/models/entity";
import { AppState } from "@core/models";
import { heroSelector } from "@core/models/selector";

@Component({
    selector: "app-character-stats",
    templateUrl: "./character-stats.component.html",
    styleUrls: ["./character-stats.component.scss"],
})
export class CharacterStatsComponent implements OnInit {
    @Input() hero: Hero;

    constructor() {}

    ngOnInit(): void {}
}
