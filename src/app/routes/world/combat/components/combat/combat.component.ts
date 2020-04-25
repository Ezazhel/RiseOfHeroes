import { heroSelector } from "@core/models/selector";
import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import { Component, OnInit } from "@angular/core";
import { AppState } from "@core/models";
import { Combatant, Hero } from "@core/models/entity";

@Component({
    selector: "app-combat",
    templateUrl: "./combat.component.html",
    styleUrls: ["./combat.component.scss"],
})
export class CombatComponent implements OnInit {
    public hero$: Observable<Hero> = this.store.pipe(select(heroSelector));
    public monster$: Observable<Combatant> = null;

    constructor(private store: Store<AppState>) {}

    ngOnInit(): void {
        console.log("test");
    }
}
