import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslocoModule } from "@ngneat/transloco";
import { DragDropModule } from "@angular/cdk/drag-drop";
import * as fromComponents from "./components/";
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
    declarations: [fromComponents.components],
    imports: [CommonModule, TranslocoModule, DragDropModule, FlexLayoutModule],
    exports: [
        TranslocoModule,
        fromComponents.components,
        DragDropModule,
        FlexLayoutModule,
    ],
})
export class SharedModule {}
