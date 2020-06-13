import {
    Spells,
    OvertimeSpells,
    HealSpells,
} from "@core/models/spells/spells.model";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Hero } from "@core/models/entity";
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
    @Output() castSpell = new EventEmitter<
        Spells | OvertimeSpells | HealSpells
    >();
    @Input() set hero(value: Hero) {
        this._hero$.next(value);
    }

    healthPercentage$: Observable<number> = this.hero$.pipe(
        map((hero: Hero) => {
            return hero ? Math.round((hero.hp / hero.maxHp) * 100) : 0;
        })
    );

    cast(spell: Spells | OvertimeSpells | HealSpells) {
        this.castSpell.emit(spell);
    }
    constructor() {}

    ngOnInit(): void {}
}
