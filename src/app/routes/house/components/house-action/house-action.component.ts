import { Component, OnInit, OnDestroy } from "@angular/core";
@Component({
    selector: "house-action",
    templateUrl: "./house-action.component.html",
    styleUrls: ["./house-action.component.scss"],
})
export class HouseActionComponent implements OnInit, OnDestroy {
    public timer: number;
    setTimer(timer: number) {
        this.clearTimer();
        this.timer = timer;
    }
    clearTimer() {
        clearTimeout(this.timer);
    }
    constructor() {}

    ngOnInit(): void {}

    ngOnDestroy(): void {
        this.clearTimer();
    }
}
