import { citySelector } from "./../../../city/store/city.selector";
import { fighters } from "@core/models/game-data/game-data.data";
import { heroSelector } from "@core/models/selector";
import { Observable, Subscription } from "rxjs";
import { Store, select } from "@ngrx/store";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { AppState } from "@core/models";
import { Fighter, Hero } from "@core/models/entity/entity";
import { Router, ActivatedRoute } from "@angular/router";
import { toNumber } from "@ngneat/transloco";
import { CombatService } from "@core/services/combat.service";
import {
    Spells,
    OvertimeSpells,
    HealSpells,
} from "@core/models/spells/spells.model";
import { GameStateUpdateHeroAction } from "@core/models/game-state/game-state.action";
import { first, take } from "rxjs/operators";
import { getFighterWithLevel } from "@routes/world/city/store/cities.utils";
import { City } from "@routes/world/city/store/cities.model";
import { Potion } from "@core/models/potions/potions.model";
@Component({
    selector: "app-combat",
    templateUrl: "./combat.component.html",
    styleUrls: ["./combat.component.scss"],
})
export class CombatComponent implements OnInit, OnDestroy {
    public hero$: Observable<Hero> = this.store.select(heroSelector);
    public city$: Observable<City> = this.store.select(
        citySelector(this.route.snapshot.paramMap.get("cityId"))
    );
    public fighter: Fighter;
    subscription: Subscription;

    activateSpell(spell: Spells | OvertimeSpells | HealSpells | Potion) {
        if (spell.type == "item") {
            this.combatService.usePotion(spell as Potion);
        } else {
            this.combatService.activateSpell(spell as Spells);
        }
    }
    constructor(
        private store: Store<AppState>,
        private route: ActivatedRoute,
        private combatService: CombatService,
        private router: Router
    ) {}

    ngOnInit(): void {
        let fighter = fighters.get(this.route.snapshot.paramMap.get("monster"));
        this.city$.pipe(take(1)).subscribe((c: City) => {
            let currentLevel = c.building
                .find((b) => b.type == "huntingPost")
                .actions.find((a) => a.targetId === fighter.eid).currentLevel;
            this.fighter = getFighterWithLevel(fighter, currentLevel);
        });

        this.combatService.fighter = this.fighter;
        this.subscription = this.hero$.subscribe((h: Hero) =>
            this.combatService.initialize(h)
        );
    }
    ngOnDestroy(): void {
        this.hero$.pipe(first()).subscribe((h: Hero) =>
            this.store.dispatch(
                new GameStateUpdateHeroAction({
                    ...h,
                    hp: h.maxHp,
                })
            )
        );
        this.subscription.unsubscribe();
        this.combatService.fighter = null; //correction when leaving as "activate spell reset fight"
        this.combatService.stop();
    }
}
