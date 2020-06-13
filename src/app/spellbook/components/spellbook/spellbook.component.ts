import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "@core/models";
import { spellsSelector } from "@core/models/selector";
import {
    Spells,
    OvertimeSpells,
    HealSpells,
} from "@core/models/spells/spells.model";
import { Observable } from "rxjs";

type tabsType = "active" | "passive";
@Component({
    selector: "app-spellbook",
    templateUrl: "./spellbook.component.html",
    styleUrls: ["./spellbook.component.scss"],
})
export class SpellbookComponent implements OnInit {
    @Output() closing = new EventEmitter<void>();
    _spells$: Observable<
        Array<Spells | OvertimeSpells | HealSpells>
    > = this.store.select(spellsSelector);

    tabs: tabsType;

    getActiveSpells(
        spells: (Spells | OvertimeSpells | HealSpells)[],
        active: boolean
    ) {
        return spells.filter((s) => s.isActive == active);
    }

    onClose() {
        this.closing.emit();
    }

    switchTabs(tabs: tabsType) {
        this.tabs = tabs;
    }
    constructor(private store: Store<AppState>) {}

    ngOnInit(): void {}
}
