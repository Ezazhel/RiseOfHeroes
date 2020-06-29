import { BuildingAction, City } from "../../../store/cities.model";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Building } from "../../../store/cities.model";
import { fighters } from "@core/models/game-data/game-data.data";
import { Fighter } from "@core/models/entity/entity";
import { getFighterWithLevel } from "@routes/world/city/store/cities.utils";
@Component({
    selector: "huntingPost",
    template: ` <div fxLayout="row wrap" fxLayoutAlign="center center">
        <huntingPost-post
            *ngFor="let action of building.actions; trackBy: trackByFn"
            [action]="action"
            [building]="building"
            [city]="city"
            [fighter]="fighterFor(action)"
            [tooltip]="fighterFor(action).lootbag"
            [tooltip-type]="'lootbag'"
            (hunt)="huntStarted.emit($event)"
            [tooltip-detach]="huntStarted"
        ></huntingPost-post>
    </div>`,
    styleUrls: ["../city-building.component.scss"],
})
export class HuntingPost implements OnInit {
    @Input() building: Building;
    @Input() city: City;
    @Output() huntStarted = new EventEmitter<boolean>();

    fighterFor(a: BuildingAction): Fighter {
        return getFighterWithLevel(
            fighters[a.targetId],
            this.building.actions.find((f) => f.targetId == a.targetId)
                .currentLevel
        );
    }

    trackByFn(index: number, el: BuildingAction) {
        return index;
    }
    constructor() {}

    ngOnInit(): void {}
}
