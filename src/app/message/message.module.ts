import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import * as fromComponents from "./components";

@NgModule({
    declarations: [fromComponents.components],
    imports: [CommonModule],
    exports: [fromComponents.MessageComponent]
})
export class MessageModule {}
