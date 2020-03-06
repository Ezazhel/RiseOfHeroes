import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslocoModule } from "@ngneat/transloco";
import { ModalComponent } from "./components/modal/modal.component";
import { DragDropModule } from "@angular/cdk/drag-drop";
import * as fromComponents from "./components/";
@NgModule({
    declarations: [ModalComponent, fromComponents.components],
    imports: [CommonModule, TranslocoModule, DragDropModule],
    exports: [TranslocoModule, fromComponents.components]
})
export class SharedModule {}
