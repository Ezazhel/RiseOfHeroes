import { MessageService } from "@core/services";
import { AppState } from "..";
import { GameStateService } from "@core/services/game-state.service";
import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { Actions, Effect, ofType } from "@ngrx/effects";
import {
    GAME_LOAD,
    GameStateLoadFailAction,
    GameStateLoadSuccessAction,
    GameStateLoadAction,
    GAME_SAVE,
    GameStateSaveSuccessAction,
    GameStateSaveFailAction,
    GAME_SAVE_SUCCESS,
} from "./game-state.action";
import { switchMap, map, catchError, tap } from "rxjs/operators";

@Injectable()
export class GameStateEffects {
    //Add effect on load game.
    @Effect() initLoadGame = this.actions$.pipe(
        ofType(GAME_LOAD),
        switchMap((action: GameStateLoadAction) => this.gameState.load()),
        map((appState: AppState) => {
            return new GameStateLoadSuccessAction(appState);
        }),
        catchError((e) => {
            return of(new GameStateLoadFailAction(e.toString()));
        })
    );

    /**
     * When a save action is dispatched, serialize the app state to local storage.
     */
    @Effect() saveGameState$ = this.actions$.pipe(
        ofType(GAME_SAVE),
        switchMap(() => this.gameState.save()),
        map(() => new GameStateSaveSuccessAction()),
        catchError((e) => {
            return of(new GameStateSaveFailAction(e.toString()));
        })
    );

    @Effect({ dispatch: false })
    saveGameSuccess$ = this.actions$.pipe(
        ofType(GAME_SAVE_SUCCESS),
        tap(() => {
            this.messageService;
        })
    );

    constructor(
        private gameState: GameStateService,
        private actions$: Actions,
        private messageService: MessageService
    ) {}
}
