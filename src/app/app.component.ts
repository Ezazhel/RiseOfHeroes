import { GameStateLoadAction } from "./core/models/game-state/game-state.action";
import { GameService, MessageService } from "@core/services";
import { Component, OnInit, Input } from "@angular/core";
import { GameStateService } from "@core/services/game-state.service";
import { Store } from "@ngrx/store";
import { AppState } from "@core/models";
import { TranslocoService } from "@ngneat/transloco";
@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
    title = "Rise of Hero";
    constructor(
        public gameState: GameStateService,
        public gameService: GameService,
        public messageService: MessageService,
        public translate: TranslocoService
    ) {}
    ngOnInit() {
        this.gameService.initGame().then((newGame: boolean) => {
            if (newGame) {
                this.messageService.addGeneralMessage(
                    this.translate.selectTranslate("game.InitWelcome")
                );
            } else {
                this.messageService.addGeneralMessage(
                    this.translate.selectTranslate("game.loadWelcome")
                );
            }
        });
    }
}
