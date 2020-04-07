import { CombatRecord } from "@core/models/combat/combat.reducer";
import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import { Component, OnInit } from "@angular/core";
import { AppState } from "@core/models";
import { map } from "rxjs/operators";
import { Entity } from "@core/models/base-entity";
import { Combatant } from "@core/models/combat/combat.model";

@Component({
    selector: "app-combat",
    templateUrl: "./combat.component.html",
    styleUrls: ["./combat.component.scss"],
})
export class CombatComponent implements OnInit {
    public hero$: Observable<Entity> = this.store.pipe(select("hero"));
    public monster$: Observable<Combatant> = this.store.pipe(
        select("combat"),
        map((combatRecord: CombatRecord) => combatRecord.monster)
    );
    constructor(private store: Store<AppState>) {}

    ngOnInit(): void {}
}
