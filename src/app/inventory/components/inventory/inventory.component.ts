import { InventoryService } from "@core/services";
import { Component, OnInit, Input } from "@angular/core";

@Component({
    selector: "app-inventory",
    templateUrl: "./inventory.component.html",
    styleUrls: ["./inventory.component.css"]
})
export class InventoryComponent implements OnInit {
    display: boolean;
    constructor(public inventoryService: InventoryService) {}

    ngOnInit(): void {
        this.inventoryService.showInventory.subscribe(d => {
            this.display = d;
        });
    }
    showInventory() {
        this.inventoryService.setshowInventory();
    }
}
