import { Component, OnInit, Input } from "@angular/core";
import { Entity } from "@core/models/entity";

@Component({
    selector: "app-hud-portrait",
    templateUrl: "./hud-portrait.component.html",
    styleUrls: ["./hud-portrait.component.css"]
})
export class HudPortraitComponent implements OnInit {
    @Input() entity: Entity;
    constructor() {}

    ngOnInit(): void {}
}
