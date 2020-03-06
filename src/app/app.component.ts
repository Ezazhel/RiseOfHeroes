import { Monster, Hero } from "@core/models";
import { GameService } from "@core/services";
import { Component, OnInit, Input } from "@angular/core";
@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
    title = "Rise of Hero";
    player: Hero;
    constructor(public gameService: GameService) {
        this.player = gameService.player;
    }
    ngOnInit() {}
}
