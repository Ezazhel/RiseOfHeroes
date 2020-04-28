import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import * as fromComponents from "./components";
import { SharedModule } from "@shared/shared.module";

@NgModule({
    declarations: [fromComponents.components],
    imports: [CommonModule, SharedModule],
    exports: [fromComponents.CharacterComponent]
})
export class CharacterModule {}
