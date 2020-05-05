import { InventoryModule } from "app/inventory/inventory.module";
import { SharedModule } from "@shared/shared.module";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import * as fromComponents from "./components";
import { CityShopContentShopComponent } from "./components/city-shop/city-shop-content/city-shop-content-shop/city-shop-content-shop.component";

@NgModule({
    declarations: [fromComponents.components],
    imports: [
        CommonModule,
        SharedModule,
        InventoryModule,
        RouterModule.forChild([
            { path: ":cityId", component: fromComponents.CityComponent },
        ]),
    ],
})
export class CityModule {}
