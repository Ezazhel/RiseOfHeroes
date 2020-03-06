import { Component, OnInit, Input } from "@angular/core";
import { Entity } from "@core/models/entity";

@Component({
    selector: "app-hud-portrait-bars-health",
    templateUrl: "./hud-portrait-bars-health.component.html",
    styleUrls: ["./hud-portrait-bars-health.component.css"]
})
export class HudPortraitBarsHealthComponent implements OnInit {
    @Input() entity: Entity;
    constructor() {}

    ngOnInit(): void {}
}
