import { Component, OnInit, Input } from "@angular/core";
import { Entity } from "@core/models/entity";

@Component({
    selector: "app-hud-portrait-avatar",
    templateUrl: "./hud-portrait-avatar.component.html",
    styleUrls: ["./hud-portrait-avatar.component.css"]
})
export class HudPortraitAvatarComponent implements OnInit {
    @Input() entity: Entity;
    constructor() {}

    ngOnInit(): void {}
}
