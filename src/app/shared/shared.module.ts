import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslocoModule } from "@ngneat/transloco";
import { DragDropModule } from "@angular/cdk/drag-drop";
import * as fromComponents from "./components/";
@NgModule({
    declarations: [fromComponents.components],
    imports: [CommonModule, TranslocoModule, DragDropModule],
    exports: [TranslocoModule, fromComponents.components, DragDropModule],
})
export class SharedModule {}
