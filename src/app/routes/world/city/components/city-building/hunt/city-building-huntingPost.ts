import { BuildingAction, City } from "../../../store/cities.model";
import { Component, OnInit, Input } from "@angular/core";
import { Building } from "../../../store/cities.model";
import { fighters } from "@core/models/game-data/game-data.data";
import { Fighter } from "@core/models/entity";
import { getFighterWithLevel } from "@routes/world/city/store/cities.utils";
@Component({
    selector: "huntingPost",
    template: ` <div fxLayout="row nowrap" fxLayoutAlign="center center">
        <huntingPost-post
            *ngFor="let action of building.actions; trackBy: trackByFn"
            [action]="action"
            [building]="building"
            [city]="city"
            [fighter]="fighterFor(action)"
        ></huntingPost-post>
    </div>`,
    styleUrls: ["../city-building.component.scss"],
})
export class HuntingPost implements OnInit {
    @Input() building: Building;
    @Input() city: City;

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
