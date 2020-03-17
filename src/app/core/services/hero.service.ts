import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class HeroService {
    constructor() {}

    showInventory: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
        false
    );
    showStats: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    setshowInventory() {
        this.showInventory.next(!this.showInventory.getValue());
    }
    setshowStats() {
        this.showStats.next(!this.showStats.getValue());
    }
}
