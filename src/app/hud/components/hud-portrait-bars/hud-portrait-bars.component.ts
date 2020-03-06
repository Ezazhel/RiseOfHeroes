import { Component, OnInit, Input } from "@angular/core";
import { Entity } from "@core/models/entity";

@Component({
    selector: "app-hud-portrait-bars",
    templateUrl: "./hud-portrait-bars.component.html",
    styleUrls: ["./hud-portrait-bars.component.css"]
})
export class HudPortraitBarsComponent implements OnInit {
    @Input() entity: Entity;
    constructor() {}

    ngOnInit(): void {}
}
