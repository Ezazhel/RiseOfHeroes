import { Observable, BehaviorSubject, Subject } from "rxjs";
import { Component, OnInit, Input } from "@angular/core";
import { map } from "rxjs/operators";
import { getXPForLevel } from "@core/models/level";
import { BaseEntity, Hero } from "@core/models/entity/entity";
@Component({
    selector: "app-combat-portrait",
    templateUrl: "./combat-portrait.component.html",
    styleUrls: ["./combat-portrait.component.scss"],
})
export class CombatPortraitComponent implements OnInit {
    private _entity$: Subject<BaseEntity> = new BehaviorSubject<BaseEntity>(
        null
    );
    entity$: Observable<BaseEntity> = this._entity$;

    @Input() set entity(value: BaseEntity) {
        this._entity$.next(value);
    }

    constructor() {}

    healthPercentage$: Observable<number> = this.entity$.pipe(
        map((entity: BaseEntity) => {
            return entity ? Math.round((entity.hp / entity.maxHp) * 100) : 0;
        })
    );
    experiencePercentage$: Observable<number> = this.entity$.pipe(
        map((entity: Hero) => {
            return entity
                ? Math.round((entity.exp / getXPForLevel(entity.level)) * 100)
                : 0;
        })
    );
    castingPercentage$: Observable<number> = this.entity$.pipe(
        map((entity: BaseEntity) => {
            return 0;
        })
    );
    nextLevelExp$: Observable<number> = this.entity$.pipe(
        map((entity: Hero) => {
            return entity ? getXPForLevel(entity.level + 1) : 0;
        })
    );

    ngOnInit(): void {}
}
