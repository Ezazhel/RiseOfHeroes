import { currencySelector } from "@core/models/selector";
import {
    Component,
    OnInit,
    OnDestroy,
    Input,
    Output,
    EventEmitter,
} from "@angular/core";

import { Observable } from "rxjs";
import { first } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { AppState } from "@core/models";
import { NotifierService } from "@core/services/notifier.service";
import { CurrencyType } from "@core/models/game-data/game-data.data";
import { Currency } from "@core/models/game-data/game-data.model";
import { Conversion } from "../merchant.component";
import { CurrencyConversion } from "@routes/world/city/store/cities.model";

@Component({
    selector: "merchant-item",
    templateUrl: "./merchant-item.component.html",
    styleUrls: ["./merchant-item.component.scss"],
})
export class MerchantItemComponent implements OnInit, OnDestroy {
    @Output() convert: EventEmitter<Conversion> = new EventEmitter<
        Conversion
    >();
    @Input() goods: CurrencyConversion[];

    doConvert(conversion: Conversion) {
        this.convert.emit(conversion);
    }

    public getCurrency(type: CurrencyType): Observable<Currency> {
        return this.store.select(currencySelector(type));
    }

    public canConvert(item: CurrencyConversion, qty: number) {
        let can = false;
        this.getCurrency(item.from.name)
            .pipe(first())
            .subscribe((g) => {
                if (qty == -1) {
                    const max = Math.floor(g?.quantity / item.from.quantity);
                    qty = max > 0 ? max : 1;
                }
                can = g?.quantity >= item.from.quantity * qty;
            });
        return can;
    }

    trackByFn(index: number, el: CurrencyConversion) {
        return el;
    }

    constructor(
        private store: Store<AppState>,
        private _notifier: NotifierService
    ) {}
    ngOnInit(): void {}

    ngOnDestroy(): void {}
}
