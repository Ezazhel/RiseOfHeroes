import { BuildingAction } from "../../../store/cities.model";
import { Component, OnInit, Input } from "@angular/core";
import { Building } from "../../../store/cities.model";
import { fighters } from "@core/models/game-data/game-data.data";
import { Fighter } from "@core/models/entity";
@Component({
    selector: "huntingPost",
    template: ` <div fxLayout="row nowrap" fxLayoutAlign="center center">
        <huntingPost-post
            *ngFor="let action of building.actions; trackBy: trackByFn"
            [action]="action"
            [fighter]="fighterFor(action)"
        ></huntingPost-post>
    </div>`,
    styleUrls: ["../city-building.component.scss"],
})
export class HuntingPost implements OnInit {
    @Input() building: Building;
    @Input() cityId: number;

    fighterFor(a: BuildingAction): Fighter {
        return fighters[a.targetId];
    }

    trackByFn(index: number, el: BuildingAction) {
        return index;
    }
    constructor() {}

    ngOnInit(): void {}
}
