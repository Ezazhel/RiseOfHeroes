import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import * as fromComponents from "./components";
import { SharedModule } from "@shared/shared.module";
@NgModule({
    declarations: [fromComponents.components],
    imports: [CommonModule, SharedModule],
    exports: [fromComponents.MessageComponent]
})
export class MessageModule {}
