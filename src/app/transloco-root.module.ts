import { HttpClient } from "@angular/common/http";
import {
    TRANSLOCO_LOADER,
    Translation,
    TranslocoLoader,
    TRANSLOCO_CONFIG,
    translocoConfig,
    TranslocoModule,
    TranslocoMissingHandler,
    TranslocoConfig,
    TRANSLOCO_MISSING_HANDLER,
} from "@ngneat/transloco";
import { Injectable, NgModule } from "@angular/core";
import { environment } from "../environments/environment";

@Injectable({ providedIn: "root" })
export class TranslocoHttpLoader implements TranslocoLoader {
    constructor(private http: HttpClient) {}

    getTranslation(lang: string) {
        return this.http.get<Translation>(`./assets/i18n/${lang}.json`);
    }
}
export class CustomHandler implements TranslocoMissingHandler {
    handle(key: string, config: TranslocoConfig) {
        return key;
    }
}

export const customMissingHandler = {
    provide: TRANSLOCO_MISSING_HANDLER,
    useClass: CustomHandler,
};
@NgModule({
    exports: [TranslocoModule],
    providers: [
        {
            provide: TRANSLOCO_CONFIG,
            useValue: translocoConfig({
                availableLangs: ["en", "fr"],
                defaultLang: "en",
                fallbackLang: "en",
                // Remove this option if your application doesn't support changing language in runtime.
                reRenderOnLangChange: true,
                prodMode: environment.production,
            }),
        },
        { provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader },
        customMissingHandler,
    ],
})
export class TranslocoRootModule {}
