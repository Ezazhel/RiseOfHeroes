import { Component, OnInit, OnDestroy } from "@angular/core";
@Component({
    selector: "house-action",
    templateUrl: "./house-action.component.html",
    styleUrls: ["./house-action.component.scss"],
})
export class HouseActionComponent implements OnInit, OnDestroy {
    public dTab: string = "training";

    //#endregion Private
    constructor() {}

    ngOnInit(): void {}

    ngOnDestroy(): void {}
}
