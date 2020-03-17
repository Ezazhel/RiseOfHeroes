import { HeroService } from "@core/services";
import { Component, OnInit, Input } from "@angular/core";

@Component({
    selector: "app-inventory",
    templateUrl: "./inventory.component.html",
    styleUrls: ["./inventory.component.css"]
})
export class InventoryComponent implements OnInit {
    display: boolean;
    constructor(public heroService: HeroService) {}

    ngOnInit(): void {
        this.heroService.showInventory.subscribe(d => {
            this.display = d;
        });
    }
    showInventory() {
        this.heroService.setshowInventory();
    }
}
