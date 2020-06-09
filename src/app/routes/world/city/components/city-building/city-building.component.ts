import { descriptionFor } from "@core/models/actions";
import { Observable } from "rxjs";
import { Component, OnInit, Input } from "@angular/core";
import { Building, BuildingAction } from "../../store/cities.model";
import { Router } from "@angular/router";

@Component({
    selector: "app-city-building",
    templateUrl: "./city-building.component.html",
    styleUrls: ["./city-building.component.scss"],
})
export class CityBuildingComponent implements OnInit {
    @Input("building") building$: Observable<Building>;
    @Input() cityId: number;

    descriptionFor(a: BuildingAction) {
        return descriptionFor(a);
    }

    effect(a: BuildingAction) {
        switch (a.type) {
            case "hunt":
                this.router.navigateByUrl(`/world/combat/${a.targetId}`);
                break;
        }
    }
    constructor(private router: Router) {}

    ngOnInit(): void {}
}
