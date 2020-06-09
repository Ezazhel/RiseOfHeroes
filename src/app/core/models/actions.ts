import { BuildingAction } from "@routes/world/city/store/cities.model";
import { fighters } from "./game-data/game-data.data";

export type ActionType = "hunt" | "promote" | "recruit";

export function descriptionFor(action: BuildingAction) {
    switch (action.type) {
        case "hunt":
            return { fighters: fighters[action.targetId].name };
        case "promote":
            break;
        case "recruit":
            break;
    }
}

export function effect(action: BuildingAction) {
    switch (
        action.type //switch allow to not call another action for this type
    ) {
        case "hunt":
            switch (action.effectId) {
                case 0:
                    //redirect to world/combat?monster.
                    break;
            }
            break;
    }
}
