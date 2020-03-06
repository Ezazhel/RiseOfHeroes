import { MessageModule } from "./message/message.module";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { GameComponent } from "./game/components";
import { HttpClientModule } from "@angular/common/http";
import { TranslocoRootModule } from "./transloco-root.module";
import { HudModule } from "app/hud/hud.module";
@NgModule({
    declarations: [AppComponent, GameComponent],

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        MessageModule,
        HttpClientModule,
        TranslocoRootModule,
        HudModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
