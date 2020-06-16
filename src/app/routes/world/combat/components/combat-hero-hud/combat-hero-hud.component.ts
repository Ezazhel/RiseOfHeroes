import {
    Spells,
    OvertimeSpells,
    HealSpells,
} from "@core/models/spells/spells.model";
import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    HostListener,
} from "@angular/core";
import { Hero } from "@core/models/entity";
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { map, first } from "rxjs/operators";

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
    @Output() spellCasted = new EventEmitter<boolean>();

    healthPercentage$: Observable<number> = this.hero$.pipe(
        map((hero: Hero) => {
            return hero ? Math.round((hero.hp / hero.maxHp) * 100) : 0;
        })
    );

    casted(b: boolean) {
        this.spellCasted.emit(b);
    }
    @HostListener("document:keydown")
    cast(spell: Spells | OvertimeSpells | HealSpells) {
        if (event.type == "keydown") {
            const hotKey = String.fromCharCode(
                (event as KeyboardEvent).keyCode
            );
            let equippedSpells;
            this.hero$
                .pipe(first())
                .subscribe((h: Hero) => (equippedSpells = h.equippedSpell));
            equippedSpells.forEach((spell: Spells, index) => {
                if (hotKey === (index + 1).toString()) {
                    if (!spell.isInCooldown) {
                        this.castSpell.emit(spell);
                        this.casted(true);
                    }
                    return; //once we find the right one we return (in order to not fetch all array)
                }
            });
            return;
        }
        this.castSpell.emit(spell);
        this.casted(true);
    }

    trackByFn(index: number, el: Spells | OvertimeSpells | HealSpells) {
        return el;
    }
    constructor() {}

    ngOnInit(): void {}
}
