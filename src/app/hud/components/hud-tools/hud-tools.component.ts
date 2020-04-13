import { MessageService } from "@core/services";
import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { TranslocoService } from "@ngneat/transloco";
import { GameService } from "@core/services";

@Component({
    selector: "app-hud-tools",
    templateUrl: "./hud-tools.component.html",
    styleUrls: ["./hud-tools.component.scss"],
})
export class HudToolsComponent implements OnInit {
    @Output() closing = new EventEmitter<void>();

    constructor(
        private transloco: TranslocoService,
        private gameService: GameService,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {}
    public setActiveLang(lang: string) {
        this.transloco.setActiveLang(lang);
    }

    public reset() {
        if (confirm(this.transloco.translate("game.alertHARDRESET"))) {
            this.gameService
                .initGame(false)
                .then(() =>
                    this.messageService.addGeneralMessage(
                        this.transloco.selectTranslate(
                            "game.InitWelcomeAfterReset"
                        )
                    )
                );
        }
    }
    onClose() {
        this.closing.emit();
    }
}
