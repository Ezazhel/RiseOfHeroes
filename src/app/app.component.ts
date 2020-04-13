import { GameStateLoadAction } from "./core/models/game-state/game-state.action";
import { GameService } from "@core/services";
import { Component, OnInit, Input } from "@angular/core";
import { GameStateService } from "@core/services/game-state.service";
import { Store } from "@ngrx/store";
import { AppState } from "@core/models";
@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
    title = "Rise of Hero";
    constructor(public gameState: GameStateService) {}
    ngOnInit() {}
}
