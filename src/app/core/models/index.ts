import { ActionReducerMap, ActionReducer, Action } from "@ngrx/store";
import * as fromGameState from "./game-state/game-state.reducer";

export interface AppState {
    gameState: fromGameState.GameState;
}

export function metaReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    // a function with the exact same signature of a reducer
    return function (state: any, action: Action) {
        return reducer(state, action);
    };
}

export const reducers: ActionReducerMap<AppState> = {
    gameState: fromGameState.gameRecuder,
};

export * from "./message";
