import { MessageService } from "@core/services";
import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { TranslocoService } from "@ngneat/transloco";
import { GameService } from "@core/services";
import { Router } from "@angular/router";

@Component({
    selector: "app-hud-tools",
    templateUrl: "./hud-tools.component.html",
    styleUrls: ["./hud-tools.component.scss"],
})
export class HudToolsComponent implements OnInit {
    @Output() closing = new EventEmitter<void>();

    constructor(private router: Router, private transloco: TranslocoService) {}

    ngOnInit(): void {}
    public setActiveLang(lang: string) {
        this.transloco.setActiveLang(lang);
    }

    public reset() {
        if (confirm(this.transloco.translate("game.alertHARDRESET"))) {
            this.router.navigateByUrl(`/house`);
            setTimeout(() => {
                localStorage.clear();
                window.location.reload();
            }, 100);
        }
    }
    onClose() {
        this.closing.emit();
    }
}
