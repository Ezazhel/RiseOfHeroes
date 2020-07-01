import { ActionReducerMap, ActionReducer, MetaReducer } from "@ngrx/store";
import { localStorageSync } from "ngrx-store-localstorage";
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

export const reducers: ActionReducerMap<AppState> = {
    gameState: fromGameState.gameRecuder,
    house: fromHouseState.houseReducer,
    cities: fromCitiesState.citiesReducer,
    router: routerReducer,
};

export function localStorageSyncReducer(
    reducer: ActionReducer<any>
): ActionReducer<any> {
    return localStorageSync({
        keys: [
            {
                gameState: {
                    encrypt: (state) => btoa(state),
                    decrypt: (state) => atob(state),
                },
            },
            {
                house: {
                    encrypt: (state) => btoa(state),
                    decrypt: (state) => atob(state),
                },
            },
            {
                cities: {
                    encrypt: (state) => btoa(state),
                    decrypt: (state) => atob(state),
                },
            },
            { router: {} },
        ],
        rehydrate: true,
    })(reducer);
}

export * from "./message";
