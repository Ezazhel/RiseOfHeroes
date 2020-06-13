import { fighters } from "@core/models/game-data/game-data.data";
import { heroSelector } from "@core/models/selector";
import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { AppState } from "@core/models";
import { Fighter, Hero } from "@core/models/entity";
import { Router, ActivatedRoute } from "@angular/router";
import { toNumber } from "@ngneat/transloco";
import { CombatService } from "@core/services/combat.service";
import {
    Spells,
    OvertimeSpells,
    HealSpells,
} from "@core/models/spells/spells.model";
@Component({
    selector: "app-combat",
    templateUrl: "./combat.component.html",
    styleUrls: ["./combat.component.scss"],
})
export class CombatComponent implements OnInit, OnDestroy {
    public hero$: Observable<Hero> = this.store.pipe(select(heroSelector));
    public fighter: Fighter =
        fighters[toNumber(this.route.snapshot.paramMap.get("monster"))];

    activateSpell(spell: Spells | OvertimeSpells | HealSpells) {
        this.combatService.activateSpell(spell);
    }
    constructor(
        private store: Store<AppState>,
        private route: ActivatedRoute,
        private combatService: CombatService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.hero$.subscribe((h: Hero) =>
            this.combatService.initialize(h, this.fighter)
        );
    }
    ngOnDestroy(): void {
        this.combatService.stop();
    }
}
