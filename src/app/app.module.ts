import { HttpClientModule } from "@angular/common/http";
import { HouseModule } from "./routes/house/house.module";
import { reducers, localStorageSyncReducer } from "@core/models/";
import { MessageModule } from "./message/message.module";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TranslocoRootModule } from "./transloco-root.module";
import { HudModule } from "./hud/hud.module";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { StoreModule, MetaReducer } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { StoreRouterConnectingModule } from "@ngrx/router-store";
import { NotificationModule } from "./notification/notification.module";

const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];
@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        TranslocoRootModule,
        HudModule,
        DragDropModule,
        NotificationModule,
        HouseModule,
        StoreModule.forRoot(reducers, { metaReducers }),
        StoreRouterConnectingModule.forRoot({
            stateKey: "router",
        }),
        EffectsModule.forRoot([]),
        StoreDevtoolsModule.instrument({ name: "idle" }),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
