import {
    Spells,
    OvertimeSpells,
    HealSpells,
} from "@core/models/spells/spells.model";
import {
    Component,
    OnInit,
    Output,
    EventEmitter,
    HostListener,
    OnDestroy,
} from "@angular/core";
import { Hero } from "@core/models/entity/entity";
import { Observable, Subject, Subscription } from "rxjs";
import { map, first, withLatestFrom } from "rxjs/operators";
import { getXPForLevel } from "@core/models/level";
import { Potion } from "@core/models/potions/potions.model";
import { heroSelector } from "@core/models/selector";
import { Store } from "@ngrx/store";
import { AppState } from "@core/models";
export interface CastEvent {
    spell?: Spells;
    potion?: Potion;
    hotKey?: string;
}
@Component({
    selector: "app-combat-hero-hud",
    templateUrl: "./combat-hero-hud.component.html",
    styleUrls: ["./combat-hero-hud.component.scss"],
})
export class CombatHeroHudComponent implements OnInit, OnDestroy {
    hero$: Observable<Hero> = this.store.select(heroSelector);
    @Output() castSpell = new EventEmitter<
        Spells | OvertimeSpells | HealSpells | Potion
    >();

    @Output() spellCasted = new EventEmitter<boolean>();

    healthPercentage$: Observable<number> = this.hero$.pipe(
        map((hero: Hero) => {
            return hero ? Math.round((hero.hp / hero.maxHp) * 100) : 0;
        })
    );
    expPercentage$: Observable<number> = this.hero$.pipe(
        map((hero: Hero) => {
            return hero
                ? Math.round((hero.exp / this.getXPForLevel(hero.level)) * 100)
                : 0;
        })
    );
    potion$ = this.hero$.pipe(
        map((hero: Hero) => {
            return hero.potion;
        })
    );

    public doCastSpell$: Subject<CastEvent> = new Subject<CastEvent>();
    private _castSpellSubscription: Subscription = this.doCastSpell$
        .pipe(
            withLatestFrom(this.hero$, (event: CastEvent, hero: Hero) => {
                if (event.hotKey != "") {
                    hero.equippedSpell.forEach((sp, index) => {
                        if (event.hotKey === (index + 1).toString()) {
                            if (!sp.isInCooldown) {
                                this.castSpell.emit(sp);
                                this.casted(true);
                            }
                        }
                        return;
                    });
                } else {
                    if (event.spell.isInCooldown) return;
                    this.castSpell.emit(event.spell);
                    this.casted(true);
                }
            })
        )
        .subscribe();

    public doUsePotion$: Subject<CastEvent> = new Subject<CastEvent>();
    public _usePotionSubscription: Subscription = this.doUsePotion$
        .pipe(
            withLatestFrom(this.hero$, (event: CastEvent, hero: Hero) => {
                if (event.potion.isInCooldown) return;
                this.castSpell.emit(event.potion);
                this.spellCasted.emit(true);
            })
        )
        .subscribe();

    casted(b: boolean) {
        this.spellCasted.emit(b);
    }
    @HostListener("document:keydown")
    cast(spell: Spells | OvertimeSpells | HealSpells) {
        let hotKey = "";
        if (event.type == "keydown") {
            hotKey = String.fromCharCode((event as KeyboardEvent).keyCode);
        }
        this.doCastSpell$.next({ spell, hotKey });
    }

    getXPForLevel(level: number): number {
        return getXPForLevel(level);
    }
    trackByFn(index: number, el: Spells | OvertimeSpells | HealSpells) {
        return el;
    }
    constructor(private store: Store<AppState>) {}

    ngOnInit(): void {}

    ngOnDestroy(): void {
        this._castSpellSubscription.unsubscribe();
    }
}
