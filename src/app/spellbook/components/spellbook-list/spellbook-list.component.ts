import { GameStateUpdateHeroAction } from "./../../../core/models/game-state/game-state.action";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import {
    Spells,
    OvertimeSpells,
    HealSpells,
} from "@core/models/spells/spells.model";
import { Hero } from "@core/models/entity/entity";
import { Store } from "@ngrx/store";
import { AppState } from "@core/models";
import { updateInsert } from "@core/models/utils";

@Component({
    selector: "app-spellbook-list",
    templateUrl: "./spellbook-list.component.html",
    styleUrls: ["./spellbook-list.component.scss"],
})
export class SpellbookListComponent implements OnInit {
    @Input() hero: Hero;
    @Input() spells: (Spells | OvertimeSpells | HealSpells)[];
    @Input("active") activeSpell: boolean;

    equipSpell(spell: Spells, index: number) {
        let newHeroSpells = [...this.hero.equippedSpell];
        let indexOfSpellIfExist = newHeroSpells.findIndex(
            (s) => s != undefined && s.id == spell.id
        );
        //Equiper à l'emplacement
        //Si emplacement pris > remplacé
        // Si
        if (indexOfSpellIfExist != -1) {
            //exist
            newHeroSpells.splice(indexOfSpellIfExist, 1); //remove it
        }
        newHeroSpells[index] = spell; // remove old spell, set new one
        this.store.dispatch(
            new GameStateUpdateHeroAction({
                ...this.hero,
                equippedSpell: newHeroSpells,
            })
        );
    }

    isActiveSpell(spell: Spells, index: number) {
        if (this.hero.equippedSpell[index]?.id == spell?.id) {
            return { active: true };
        }
    }
    trackByFn(index: number, el: Spells) {
        return el;
    }
    constructor(private store: Store<AppState>) {}

    ngOnInit(): void {}
}
