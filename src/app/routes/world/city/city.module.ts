import { SharedModule } from "@shared/shared.module";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CityComponent } from "./components/city/city.component";
import { CityOverviewComponent } from "./components/city-overview/city-overview.component";
import { CityShopComponent } from "./components/city-shop/city-shop.component";

@NgModule({
    declarations: [CityComponent, CityOverviewComponent, CityShopComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild([{ path: "", component: CityComponent }]),
    ],
})
export class CityModule {}
