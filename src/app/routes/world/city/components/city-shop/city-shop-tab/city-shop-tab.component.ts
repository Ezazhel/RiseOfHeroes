import { EventEmitter, Output, Input } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { Shop } from "../../city/city.component";

@Component({
    selector: "app-city-shop-tab",
    templateUrl: "./city-shop-tab.component.html",
    styleUrls: ["./city-shop-tab.component.scss"],
})
export class CityShopTabComponent implements OnInit {
    @Input() shop: Shop;
    @Output() selectedTab = new EventEmitter<string>();

    activeTab: string = "shop";
    selectTab(tab: string) {
        this.activeTab = tab;
        this.selectedTab.emit(tab);
        console.log(tab);
    }

    constructor() {}

    ngOnInit(): void {}
}