import { Subject, BehaviorSubject } from "rxjs";
import { Observable } from "rxjs";
import { Component, OnInit, Input } from "@angular/core";
import { Fighter } from "@core/models/entity";
import { map } from "rxjs/operators";

@Component({
    selector: "app-combat-monster-hud",
    templateUrl: "./combat-monster-hud.component.html",
    styleUrls: ["./combat-monster-hud.component.scss"],
})
export class CombatMonsterHudComponent implements OnInit {
    @Input() fighter: Fighter;

    healthPercentage(f: Fighter): number {
        return Math.round((f.hp / f.maxHp) * 100);
    }
    constructor() {}

    ngOnInit(): void {}
}
