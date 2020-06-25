import {
    LootbagItem,
    LootBagPossibleReward,
} from "@core/models/game-data/game-data.model";
import { Component, OnInit, Input } from "@angular/core";

@Component({
    selector: "lootDetail",
    templateUrl: "./lootDetail.component.html",
    styleUrls: ["./lootDetail.component.scss"],
})
export class LootDetailComponent implements OnInit {
    @Input("item") item: LootbagItem[];

    trackByItem(index: number, el: LootBagPossibleReward) {
        return index;
    }
    constructor() {}

    ngOnInit(): void {}
}
