import { Component, OnInit, Input } from "@angular/core";
import { Shop } from "../city/city.component";

@Component({
    selector: "app-city-overview",
    templateUrl: "./city-overview.component.html",
    styleUrls: ["./city-overview.component.scss"],
})
export class CityOverviewComponent implements OnInit {
    @Input() shops: Shop;
    constructor() {}

    ngOnInit(): void {}

    onClose(shop: any) {
        shop.display = false;
    }
}
