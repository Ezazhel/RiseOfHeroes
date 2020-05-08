import { GameState } from "@core/models/game-state/game-state.reducer";
import { Component, OnInit, Input } from "@angular/core";
import { GameService } from "@core/services";
import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import { AppState } from "@core/models";
import { Map } from "immutable";
import { ITemplateBaseItem } from "@core/models/game-data/game-data.model";
import { map } from "rxjs/operators";
import { totalInventory } from "@core/models/selector";

@Component({
    selector: "app-hud",
    templateUrl: "./hud.component.html",
    styleUrls: ["./hud.component.scss"],
})
export class HudComponent implements OnInit {
    showInventory: boolean;
    showStat: boolean;
    showOptions: boolean;
    showMap: boolean;

    constructor(
        public gameService: GameService,
        private store: Store<AppState>
    ) {}

    totalInventory$: Observable<string> = this.store.pipe(
        select(totalInventory)
    );
    ngOnInit(): void {}
}
