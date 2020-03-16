import { Injectable } from "@angular/core";
import { Observable, of, Subject, BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class InventoryService {
    showInventory: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
        false
    );
    constructor() {}

    setshowInventory() {
        this.showInventory.next(!this.showInventory.getValue());
    }
}
