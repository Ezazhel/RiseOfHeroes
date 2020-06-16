import { Component, OnInit, Input } from "@angular/core";
import { Spells } from "@core/models/spells/spells.model";

@Component({
    selector: "hero-spell",
    templateUrl: "./hero-spell.component.html",
    styleUrls: ["./hero-spell.component.scss"],
})
export class HeroSpellComponent implements OnInit {
    @Input() spell: Spells;
    @Input() index: number;
    constructor() {}

    ngOnInit(): void {}
}
