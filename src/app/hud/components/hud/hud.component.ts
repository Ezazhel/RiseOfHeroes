import { Component, OnInit, Input } from "@angular/core";
import { Entity } from "@core/models/entity";
import { GameService } from "@core/services";
import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import { AppState } from "@core/models";
import { InventoryRecords } from "@core/models/inventory/inventory.reducer";

@Component({
    selector: "app-hud",
    templateUrl: "./hud.component.html",
    styleUrls: ["./hud.component.css"],
})
export class HudComponent implements OnInit {
    monster: Entity;
    player: Entity;

    showInventory: boolean;
    showStat: boolean;
    public inventory$: Observable<InventoryRecords> = this.store.pipe(
        select("inventory")
    );
    constructor(
        public gameService: GameService,
        private store: Store<AppState>
    ) {
        this.monster = gameService.monster;
        this.player = gameService.player;
    }

    ngOnInit(): void {}
}
