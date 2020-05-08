import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MapComponent } from "./components/map/map.component";
import { SharedModule } from "@shared/shared.module";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations: [MapComponent],
    imports: [CommonModule, SharedModule, RouterModule],
    exports: [MapComponent],
})
export class MapModule {}
