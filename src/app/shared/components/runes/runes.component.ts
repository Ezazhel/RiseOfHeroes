import { Component, OnInit, Input } from "@angular/core";
import { Rune } from "@core/models/runes/runes.model";
import { getDescription, getLimitLevel } from "@core/models/runes/runes.utils";

@Component({
    selector: "app-runes",
    templateUrl: "./runes.components.html",
    styleUrls: ["./runes.component.scss"],
})
export class RunesComponent implements OnInit {
    @Input() item: Rune;

    getDescriptionForRune(): Rune[] {
        let runes: Rune[] = [];
        for (let i = 0; i < this.item.maxEffectiveLvl; i++) {
            runes.push({ ...this.item, currentLvl: i + 1 });
        }
        return runes;
    }
    getLimitLevel(rune: Rune) {
        return getLimitLevel(rune);
    }
    description(rune: Rune) {
        return getDescription(rune);
    }
    constructor() {}

    ngOnInit(): void {}
}
