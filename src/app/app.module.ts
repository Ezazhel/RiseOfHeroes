import { MessageModule } from "./message/message.module";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { GameComponent } from "./game/components";
import { EntityComponent } from './entity/entity/entity.component';
import { EntityPortraitComponent } from './entity/entity-portrait/entity-portrait.component';
import { EntityBarsComponent } from './entity/entity-bars/entity-bars.component';
import { EntityHealthComponent } from './entity/entity-bars/entity-health/entity-health.component';
import { EntityRessourceComponent } from './entity/entity-bars/entity-ressource/entity-ressource.component';
import { EntityBarsMiscellanousComponent } from './entity/entity-bars/entity-bars-miscellanous/entity-bars-miscellanous.component';
import { EntityBarsMiscellaneousComponent } from './entity/entity-bars/entity-bars-miscellaneous/entity-bars-miscellaneous.component';
import { EntityBarsRessourceComponent } from './entity/entity-bars/entity-bars-ressource/entity-bars-ressource.component';
import { EntityBarsHealthComponent } from './entity/entity-bars/entity-bars-health/entity-bars-health.component';
@NgModule({
    declarations: [AppComponent, GameComponent, EntityComponent, EntityPortraitComponent, EntityBarsComponent, EntityHealthComponent, EntityRessourceComponent, EntityBarsMiscellanousComponent, EntityBarsMiscellaneousComponent, EntityBarsRessourceComponent, EntityBarsHealthComponent],
    imports: [BrowserModule, AppRoutingModule, FormsModule, MessageModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
