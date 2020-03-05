import { Component, OnInit, Input } from "@angular/core";
import { Entity } from "@core/models/entity";
import { GameService } from "@core/services";

@Component({
    selector: "app-hud",
    templateUrl: "./hud.component.html",
    styleUrls: ["./hud.component.css"]
})
export class HudComponent implements OnInit {
    monster: Entity;
    player: Entity;
    constructor(public gameService: GameService) {
        this.monster = gameService.monster;
        this.player = gameService.player;
    }

    ngOnInit(): void {}
}
