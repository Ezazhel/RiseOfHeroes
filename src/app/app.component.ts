import { GameService, MessageService } from "@core/services";
import { Component, OnInit, Input } from "@angular/core";
import { TranslocoService, unflatten } from "@ngneat/transloco";
@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
    title = "Rise of Hero";
    constructor(
        public gameService: GameService,
        public messageService: MessageService,
        public translate: TranslocoService
    ) {}
    ngOnInit() {
        if (!!localStorage.getItem("gameState")) {
            this.messageService.addGeneralMessage(
                this.translate.selectTranslate("game.InitWelcome")
            );
        } else {
            this.messageService.addGeneralMessage(
                this.translate.selectTranslate("game.loadWelcome")
            );
        }
    }
}
