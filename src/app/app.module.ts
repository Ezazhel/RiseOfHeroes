import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { GameComponent } from "./game/game.component";
import { MessageComponent } from "./message/message.component";
import { GamePlayerComponent } from './game/game-player/game-player.component';

@NgModule({
  declarations: [AppComponent, GameComponent, MessageComponent, GamePlayerComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
