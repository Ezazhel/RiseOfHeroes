import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MessageComponent } from "./message/components/message/message.component";
import { GamePlayerComponent, GameComponent } from "./game/components";

@NgModule({
    declarations: [
        AppComponent,
        GameComponent,
        MessageComponent,
        GamePlayerComponent
    ],
    imports: [BrowserModule, AppRoutingModule, FormsModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
