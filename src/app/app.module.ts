import { MessageModule } from "./message/message.module";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { GameComponent } from "./game/components";
@NgModule({
    declarations: [AppComponent, GameComponent],
    imports: [BrowserModule, AppRoutingModule, FormsModule, MessageModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
