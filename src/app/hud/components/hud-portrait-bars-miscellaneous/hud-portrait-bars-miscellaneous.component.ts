import { Component, OnInit, Input } from "@angular/core";
import { Entity } from "@core/models/entity";

@Component({
    selector: "app-hud-portrait-bars-miscellaneous",
    templateUrl: "./hud-portrait-bars-miscellaneous.component.html",
    styleUrls: ["./hud-portrait-bars-miscellaneous.component.css"]
})
export class HudPortraitBarsMiscellaneousComponent implements OnInit {
    @Input() entity: Entity;
    constructor() {}

    ngOnInit(): void {}
}
