import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import * as fromComponents from "./components";
import { TranslocoModule } from "@ngneat/transloco";
@NgModule({
    declarations: [fromComponents.components],
    imports: [CommonModule, TranslocoModule],
    exports: [fromComponents.MessageComponent]
})
export class MessageModule {}
