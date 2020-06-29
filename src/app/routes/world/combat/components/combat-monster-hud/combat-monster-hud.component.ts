import { rewardXp } from "@core/models/level";
import { Subject, BehaviorSubject } from "rxjs";
import { Observable } from "rxjs";
import { Component, OnInit, Input } from "@angular/core";
import { Fighter, Hero } from "@core/models/entity/entity";
import { map } from "rxjs/operators";
import { OvertimeSpells } from "@core/models/spells/spells.model";

@Component({
    selector: "app-combat-monster-hud",
    templateUrl: "./combat-monster-hud.component.html",
    styleUrls: ["./combat-monster-hud.component.scss"],
})
export class CombatMonsterHudComponent implements OnInit {
    @Input() fighter: Fighter;
    @Input() hero: Hero;
    @Input() heroLevel: number;
    healthPercentage(f: Fighter): number {
        return Math.round((f.hp / f.maxHp) * 100);
    }

    trackByFn(index: number, el: OvertimeSpells) {
        return index;
    }
    rewardExp() {
        return rewardXp(this.heroLevel, this.heroLevel - this.fighter.level);
    }
    constructor() {}

    ngOnInit(): void {}
}
