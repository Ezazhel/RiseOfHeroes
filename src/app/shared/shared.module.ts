import { DetailItemComponent } from "@shared/components/detail-item/detail-item.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslocoModule } from "@ngneat/transloco";
import { DragDropModule } from "@angular/cdk/drag-drop";
import * as fromComponents from "./components/";
import { FlexLayoutModule } from "@angular/flex-layout";
import { OverlayModule } from "@angular/cdk/overlay";
import { ToolTipDirective } from "./directives/tooltip.directive";

@NgModule({
    declarations: [fromComponents.components, ToolTipDirective],

    imports: [
        CommonModule,
        TranslocoModule,
        DragDropModule,
        FlexLayoutModule,
        OverlayModule,
    ],
    exports: [
        TranslocoModule,
        fromComponents.components,
        DragDropModule,
        FlexLayoutModule,
        OverlayModule,
        ToolTipDirective,
    ],
})
export class SharedModule {}
