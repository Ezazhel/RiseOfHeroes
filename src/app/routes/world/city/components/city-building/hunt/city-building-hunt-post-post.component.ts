import { Component, OnInit, Input } from "@angular/core";
import { BuildingAction } from "@routes/world/city/store/cities.model";
import { Fighter } from "@core/models/entity";
import { descriptionFor } from "@core/models/actions";
import { Router } from "@angular/router";

@Component({
    selector: "huntingPost-post",
    templateUrl: "./city-building-hunt-post-post.component.html",
    styleUrls: ["./city-building-hunt-post-post.component.scss"],
})
export class HuntPostPost implements OnInit {
    @Input() action: BuildingAction;
    @Input() fighter: Fighter;

    effect(a: BuildingAction) {
        switch (a.type) {
            case "hunt":
                this.router.navigateByUrl(`/world/combat/${a.targetId}`);
                break;
        }
    }
    descriptionFor(a: BuildingAction) {
        return descriptionFor(a);
    }
    constructor(private router: Router) {}

    ngOnInit(): void {}
}
