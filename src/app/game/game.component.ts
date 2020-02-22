import { Hero } from "../core/models/hero";
import { Monster } from "../core/models/monster";
import { MessageService, GameService } from "@core/services";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.css"]
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
