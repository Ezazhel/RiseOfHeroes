import { InventoryModule } from "app/inventory/inventory.module";
import { SharedModule } from "@shared/shared.module";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CityComponent } from "./components/city/city.component";
import { CityOverviewComponent } from "./components/city-overview/city-overview.component";
import { CityShopComponent } from "./components/city-shop/city-shop.component";
import { CityShopTabComponent } from "./components/city-shop/city-shop-tab/city-shop-tab.component";
import { CityShopContentComponent } from "./components/city-shop/city-shop-content/city-shop-content.component";

@NgModule({
    declarations: [
        CityComponent,
        CityOverviewComponent,
        CityShopComponent,
        CityShopTabComponent,
        CityShopContentComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        InventoryModule,
        RouterModule.forChild([{ path: "", component: CityComponent }]),
    ],
})
export class CityModule {}
