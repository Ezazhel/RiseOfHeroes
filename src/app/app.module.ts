import { InventoryModule } from "./inventory/inventory.module";
import { MessageModule } from "./message/message.module";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { TranslocoRootModule } from "./transloco-root.module";
import { HudModule } from "./hud/hud.module";
import { DragDropModule } from "@angular/cdk/drag-drop";
@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        MessageModule,
        HttpClientModule,
        TranslocoRootModule,
        HudModule,
        DragDropModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
