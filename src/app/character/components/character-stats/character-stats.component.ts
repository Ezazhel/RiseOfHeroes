import { Store, select } from "@ngrx/store";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Hero } from "@core/models/entity";
import { AppState } from "@core/models";
import { heroSelector } from "@core/models/selector";

@Component({
    selector: "app-character-stats",
    templateUrl: "./character-stats.component.html",
    styleUrls: ["./character-stats.component.css"],
})
export class CharacterStatsComponent implements OnInit {
    public _hero$: Observable<Hero> = this.store.pipe(select(heroSelector));

    constructor(private store: Store<AppState>) {}

    ngOnInit(): void {}
}
