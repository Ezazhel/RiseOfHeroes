import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { heroSelector } from "@core/models/selector";
import { Observable } from "rxjs";
import { Hero } from "@core/models/entity/entity";
import { Store } from "@ngrx/store";
import { AppState } from "@core/models";

@Component({
    selector: "app-character",
    templateUrl: "./character.component.html",
    styleUrls: ["./character.component.scss"],
})
export class CharacterComponent implements OnInit {
    @Output() closing = new EventEmitter<void>();
    _hero$: Observable<Hero> = this.store.select(heroSelector);
    constructor(private store: Store<AppState>) {}

    ngOnInit(): void {}
    showStats() {}
    onClose() {
        this.closing.emit();
    }
}
