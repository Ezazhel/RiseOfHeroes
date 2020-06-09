import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslocoModule } from "@ngneat/transloco";
import { DragDropModule } from "@angular/cdk/drag-drop";
import * as fromComponents from "./components/";
import { FlexLayoutModule } from "@angular/flex-layout";
import { CardCombatantComponent } from "./components/card-combatant/card-combatant.component";

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
