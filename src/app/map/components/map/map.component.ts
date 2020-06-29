import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { cities } from "@routes/world/city/store/city.data";
import { City } from "@routes/world/city/store/cities.model";
import { Store } from "@ngrx/store";
import { AppState } from "@core/models";
import { citiesSelector } from "@routes/world/city/store/city.selector";

@Component({
    selector: "app-map",
    templateUrl: "./map.component.html",
    styleUrls: ["./map.component.scss"],
})
export class MapComponent implements OnInit {
    constructor(private store: Store<AppState>) {}

    cities$ = this.store.select(citiesSelector);

    trackByFn(index: number, el: City) {
        return index;
    }
    @Output() closing = new EventEmitter<void>();
    ngOnInit(): void {}
    onClose() {
        this.closing.emit();
    }
}
