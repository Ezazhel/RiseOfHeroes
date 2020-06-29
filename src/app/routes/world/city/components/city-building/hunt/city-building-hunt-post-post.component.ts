import { CombatService } from "@core/services/combat.service";
import { first, take } from "rxjs/operators";
import { levelSelector } from "./../../../../../../core/models/selector";
import { rewardXp } from "@core/models/level";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import {
    BuildingAction,
    City,
    Building,
} from "@routes/world/city/store/cities.model";
import { Fighter } from "@core/models/entity/entity";
import { descriptionFor } from "@core/models/actions";
import { Router } from "@angular/router";
import { AppState } from "@core/models";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { fighterColor, update } from "@core/models/utils";
import { CityBuildingUpgradeFighter } from "@routes/world/city/store/cities.action";

@Component({
    selector: "huntingPost-post",
    templateUrl: "./city-building-hunt-post-post.component.html",
    styleUrls: ["./city-building-hunt-post-post.component.scss"],
})
export class HuntPostPost implements OnInit {
    @Input() action: BuildingAction;
    @Input() building: Building;
    @Input() fighter: Fighter;
    @Input() city: City;

    @Output("hunt") huntSelected = new EventEmitter<boolean>();

    herolevel$: Observable<number> = this.store.select(levelSelector);
    heroLevel: number;
    effect(a: BuildingAction) {
        switch (a.type) {
            case "hunt":
                this.huntSelected.emit(true);
                this.router.navigateByUrl(
                    `/world/${this.city.id}/combat/${this.fighter.name}`
                );
                break;
        }
    }

    upgrade(isUpgrade: boolean) {
        this.store.dispatch(
            new CityBuildingUpgradeFighter({
                city: this.city.id,
                building: {
                    ...this.building,
                    actions: update(
                        this.building.actions,
                        (a: BuildingAction) =>
                            a.targetId == this.action.targetId,
                        (a: BuildingAction) => ({
                            ...a,
                            currentLevel: isUpgrade
                                ? a.currentLevel + 1
                                : a.currentLevel - 1,
                        })
                    ),
                },
            })
        );
    }
    getColor() {
        return fighterColor(this.heroLevel - this.fighter.level);
    }
    descriptionFor(a: BuildingAction) {
        return descriptionFor(a);
    }

    rewardExp() {
        return rewardXp(this.heroLevel, this.heroLevel - this.fighter.level);
    }
    constructor(
        private router: Router,
        private store: Store<AppState>,
        private combatService: CombatService
    ) {}

    ngOnInit(): void {
        this.herolevel$.pipe(take(1)).subscribe((h) => (this.heroLevel = h));
    }
}
