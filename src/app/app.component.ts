import { Monster, Hero } from "@core/models";
import { GameService, HeroService } from "@core/services";
import { Component, OnInit, Input } from "@angular/core";
@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
    title = "Rise of Hero";
    player: Hero;
    constructor(
        public gameService: GameService,
        public heroService: HeroService
    ) {
        this.player = gameService.player;
        this.gameService.startGame();
    }
    ngOnInit() {}

    showInventory() {
        this.heroService.setshowInventory();
    }
    showStats() {
        this.heroService.setshowStats();
    }
}
