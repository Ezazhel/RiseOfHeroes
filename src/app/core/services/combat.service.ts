import { Store, select } from "@ngrx/store";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { AppState } from "@core/models";
import { List } from "immutable";

@Injectable({
    providedIn: "root",
})
export class CombatService {
    constructor(private store: Store<AppState>) {}
}
