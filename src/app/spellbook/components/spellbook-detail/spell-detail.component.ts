import { Component, OnInit, Input } from "@angular/core";
import {
    Spells,
    OvertimeSpells,
    HealSpells,
} from "@core/models/spells/spells.model";
import { descriptionFor } from "@core/models/spells/spells.utils";
import { Hero } from "@core/models/entity";
import { heroSelector } from "@core/models/selector";
import { AppState } from "@core/models";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
@Component({
    selector: "app-spell-detail",
    templateUrl: "./spell-detail.component.html",
    styleUrls: ["./spell-detail.component.scss"],
})
export class SpellDetailComponent implements OnInit {
    @Input() item: Spells | OvertimeSpells | HealSpells;
    hero$: Observable<Hero> = this.store.select(heroSelector);
    descriptionFor(spells: Spells | OvertimeSpells | HealSpells, hero: Hero) {
        return descriptionFor(spells, hero);
    }
    constructor(private store: Store<AppState>) {}

    ngOnInit(): void {}
}
