import { ActionReducerMap, ActionReducer, Action } from "@ngrx/store";
import { routerReducer, RouterReducerState } from "@ngrx/router-store";
import * as fromGameState from "./game-state/game-state.reducer";
import * as fromHouseState from "@routes/house/store/house.reducer";
import * as fromCitiesState from "@routes/world/city/store/cities.reducer";

export interface AppState {
    gameState: fromGameState.GameState;
    house: fromHouseState.HouseState;
    router: RouterReducerState;
    cities: fromCitiesState.CitiesState;
}

export function metaReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    // a function with the exact same signature of a reducer
    return function (state: any, action: Action) {
        return reducer(state, action);
    };
}

export const reducers: ActionReducerMap<AppState> = {
    gameState: fromGameState.gameRecuder,
    house: fromHouseState.houseReducer,
    cities: fromCitiesState.citiesReducer,
    router: routerReducer,
};

export * from "./message";
