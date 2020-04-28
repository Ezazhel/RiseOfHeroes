import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import {
    ITemplateBaseItem,
    Currency,
} from "@core/models/game-data/game-data.model";
import { Store, select } from "@ngrx/store";
import { AppState } from "@core/models";
import { Observable, Subscription, interval } from "rxjs";
import { currencySelector } from "@core/models/selector";
import { Map } from "immutable";
import {
    GameStateCurrenciesAddCurrencyAction,
    GameStateInventoryAddItemAction,
    GameStateInventoryRemoveItemAction,
} from "@core/models/game-state/game-state.action";
import { Shop } from "../../city/city.component";
@Component({
    selector: "app-city-shop-content",
    templateUrl: "./city-shop-content.component.html",
    styleUrls: ["./city-shop-content.component.scss"],
})
export class CityShopContentComponent implements OnInit, OnDestroy {
    @Input() displayedContent: string;
    @Input() shop: Shop;
    minutes: Subscription;
    timer: string;
    public _currencies$: Observable<Map<string, Currency>> = this.store.pipe(
        select(currencySelector)
    );

    public buyItem(item: ITemplateBaseItem): void {
        this.shop.items = this.shop.items.filter(
            (i, index) => i.id !== item.id
        );
        this.store.dispatch(
            new GameStateCurrenciesAddCurrencyAction({
                name: "gold",
                quantity: -item.value,
            })
        );
        this.store.dispatch(new GameStateInventoryAddItemAction(item));
    }

    public sellItem(item: ITemplateBaseItem) {
        switch (this.shop.acceptType) {
            case "consumable":
                if (item.type === "item") this.sell(item);
                else alert("You can't sell this here");
                break;
            case "equipment":
                if (item.type === "armor" || item.type === "weapon")
                    this.sell(item);
                else alert("You can't sell this here");
                break;
        }
    }
    private sell(item: ITemplateBaseItem) {
        this.shop.items = this.shop.items.set(item.id, item);
        this.store.dispatch(
            new GameStateCurrenciesAddCurrencyAction({
                name: "gold",
                quantity: item.value,
            })
        );
        this.store.dispatch(new GameStateInventoryRemoveItemAction(item.id));
    }

    trackByFn(index: number, item: ITemplateBaseItem): string {
        return item.id;
    }
    constructor(private store: Store<AppState>) {}

    ngOnInit(): void {
        var timer = 15 * 60;
        var minutes;
        var seconds;
        this.minutes = interval(1000).subscribe((x) => {
            minutes = Math.floor(timer / 60);
            seconds = Math.floor(timer % 60);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            this.timer = minutes + ":" + seconds;
            console.log(this.timer);

            --timer;
            if (timer < 0) {
                console.log("timeup");
            }
        });
    }

    ngOnDestroy() {
        this.minutes.unsubscribe();
    }
}
