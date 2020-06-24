import { Component, OnInit, Input } from "@angular/core";
import { Spells } from "@core/models/spells/spells.model";
import { descriptionFor } from "@core/models/spells/spells.utils";
import { Hero } from "@core/models/entity";
import { heroSelector } from "@core/models/selector";
import { AppState } from "@core/models";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Talent } from "@core/models/talent/talent.model";
import { getDescription } from "@core/models/talent/talent.utils";
@Component({
    selector: "app-spell-detail",
    templateUrl: "./spell-detail.component.html",
    styleUrls: ["./spell-detail.component.scss"],
})
export class SpellDetailComponent implements OnInit {
    @Input() isTalent: boolean = false;
    @Input() spell: Spells;
    @Input() talent: Talent;
    hero$: Observable<Hero> = this.store.select(heroSelector);
    descriptionFor(hero: Hero) {
        if (this.isTalent) {
            return getDescription(this.talent);
        }
        return descriptionFor(this.spell, hero);
    }
    constructor(private store: Store<AppState>) {}

    ngOnInit(): void {}
}
