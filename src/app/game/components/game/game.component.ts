import { Hero, Monster } from "@core/models";
import { MessageService, GameService } from "@core/services";
import { Component, OnInit, Input } from "@angular/core";

@Component({
    selector: "app-game",
    templateUrl: "./game.component.html",
    styleUrls: ["./game.component.scss"]
})
export class GameComponent implements OnInit {
    player: Hero;
    monster: Monster;

    constructor(
        private messageService: MessageService,
        public gameService: GameService
    ) {
        this.player = this.gameService.player;
        this.monster = this.gameService.monster;
        this.gameService.startGame();
    }

    ngOnInit() {}
}
