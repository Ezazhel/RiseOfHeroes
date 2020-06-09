import { Component, OnInit, Input } from "@angular/core";
import { Hero, BaseEntity } from "@core/models/entity";
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";

@Component({
    selector: "app-combat-hero-hud",
    templateUrl: "./combat-hero-hud.component.html",
    styleUrls: ["./combat-hero-hud.component.scss"],
})
export class CombatHeroHudComponent implements OnInit {
    private _hero$: Subject<Hero> = new BehaviorSubject<Hero>(null);
    hero$: Observable<Hero> = this._hero$;

    @Input() set hero(value: Hero) {
        this._hero$.next(value);
    }

    healthPercentage$: Observable<number> = this.hero$.pipe(
        map((hero: Hero) => {
            return hero ? Math.round((hero.hp / hero.maxHp) * 100) : 0;
        })
    );
    constructor() {}

    ngOnInit(): void {}
}
