import { Component, OnInit, Input } from "@angular/core";
import { Entity } from "@core/models/entity";
import { Hero, Monster } from "@core/models";

@Component({
    selector: "app-hud-portrait-bars-miscellaneous",
    templateUrl: "./hud-portrait-bars-miscellaneous.component.html",
    styleUrls: ["./hud-portrait-bars-miscellaneous.component.css"]
})
export class HudPortraitBarsMiscellaneousComponent implements OnInit {
    @Input() entity: any;
    constructor() {}

    ngOnInit(): void {}

    isHero(): boolean {
        return this.entity instanceof Hero;
    }
}
