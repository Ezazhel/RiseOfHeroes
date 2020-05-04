import { StoreModule } from "@ngrx/store";
import { HouseActionComponent } from "./components/house-action/house-action.component";
import { HouseComponent } from "./components/house/house.component";
import { RouterModule } from "@angular/router";
import { SharedModule } from "@shared/shared.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import * as fromComponents from "../house/components";
import { houseReducer } from "./store/house.reducer";

@NgModule({
    declarations: [fromComponents.components],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild([
            {
                path: "",
                component: HouseComponent,
                children: [{ path: "action", component: HouseActionComponent }],
            },
        ]),
    ],
    providers: [],
})
export class HouseModule {}
