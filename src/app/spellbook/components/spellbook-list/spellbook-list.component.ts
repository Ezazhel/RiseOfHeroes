import { Component, OnInit, Input } from "@angular/core";
import {
    Spells,
    OvertimeSpells,
    HealSpells,
} from "@core/models/spells/spells.model";

@Component({
    selector: "app-spellbook-list",
    templateUrl: "./spellbook-list.component.html",
    styleUrls: ["./spellbook-list.component.scss"],
})
export class SpellbookListComponent implements OnInit {
    @Input() spells: (Spells | OvertimeSpells | HealSpells)[];
    @Input("active") activeSpell: boolean;

    trackByFn(index: number, el: Spells | OvertimeSpells | HealSpells) {
        return el.id;
    }
    constructor() {}

    ngOnInit(): void {}
}
