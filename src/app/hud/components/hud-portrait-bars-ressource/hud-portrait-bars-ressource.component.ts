import { Component, OnInit, Input } from "@angular/core";
import { Entity } from "@core/models/entity";

@Component({
    selector: "app-hud-portrait-bars-ressource",
    templateUrl: "./hud-portrait-bars-ressource.component.html",
    styleUrls: ["./hud-portrait-bars-ressource.component.css"]
})
export class HudPortraitBarsRessourceComponent implements OnInit {
    @Input() entity: Entity;
    constructor() {}

    ngOnInit(): void {}
}
