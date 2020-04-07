import { Observable, BehaviorSubject, Subject } from "rxjs";
import { Component, OnInit, Input } from "@angular/core";
import { Entity } from "@core/models/base-entity";
import { map } from "rxjs/operators";
import { getXPForLevel } from "@core/models/level";
@Component({
    selector: "app-combat-portrait",
    templateUrl: "./combat-portrait.component.html",
    styleUrls: ["./combat-portrait.component.scss"],
})
export class CombatPortraitComponent implements OnInit {
    private _entity$: Subject<Entity> = new BehaviorSubject<Entity>(null);
    entity$: Observable<Entity> = this._entity$;

    @Input() set entity(value: Entity) {
        this._entity$.next(value);
    }

    constructor() {}

    healthPercentage$: Observable<number> = this.entity$.pipe(
        map((entity: Entity) => {
            return entity ? Math.round((entity.hp / entity.maxhp) * 100) : 0;
        })
    );
    experiencePercentage$: Observable<number> = this.entity$.pipe(
        map((entity: Entity) => {
            return entity
                ? Math.round((entity.exp / getXPForLevel(entity.level)) * 100)
                : 0;
        })
    );
    castingPercentage$: Observable<number> = this.entity$.pipe(
        map((entity: Entity) => {
            return 0;
        })
    );
    nextLevelExp$: Observable<number> = this.entity$.pipe(
        map((entity: Entity) => {
            return entity ? getXPForLevel(entity.level + 1) : 0;
        })
    );

    ngOnInit(): void {}
}
