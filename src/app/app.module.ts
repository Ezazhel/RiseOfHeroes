import { MessageModule } from "./message/message.module";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { GameModule } from "./game/game.module";
import { HudModule } from "app/hud/hud.module";
@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        MessageModule,
        GameModule,
        HudModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
