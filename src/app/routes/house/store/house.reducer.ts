import { trainingEquipement } from "./house.selector";
import { TrainingEquipment, TrainingType, IdleType } from "./house.model";
import * as HouseAction from "./house.action";
import * as immutable from "immutable";

const initialState: HouseState = {
    trainingEquipment: immutable.Map<TrainingType, TrainingEquipment>([
        [
            "strength",
            {
                id: "strength",
                name: "Push-Up ! ",
                description: "Do some push-up in order to build muscle",
                bonus: 0,
                speed: 10 * 1000,
                reward: 1,
                done: 0,
            },
        ],
        [
            "endurance",
            {
                id: "endurance",
                name: "Cold shower ",
                description: "Take cold shower, save penguins !",
                bonus: 0,
                speed: 10 * 1000,
                reward: 1,
                done: 0,
            },
        ],
    ]),
};

export interface HouseState {
    trainingEquipment: immutable.Map<TrainingType, TrainingEquipment>;
}

export function houseReducer(
    state: HouseState = initialState,
    action: HouseAction.HouseActionType
) {
    switch (action.type) {
        case HouseAction.HOUSE_UPDATE_TRAINING_EQUIPMENT_BONUS:
            let trainingEquipementWithBonus = state.trainingEquipment.map(
                (value, key) => {
                    return {
                        ...value,
                        bonus: value.bonus + 5 * action.payload,
                    };
                }
            );
            return {
                ...state,
                trainingEquipment: trainingEquipementWithBonus,
            };
        case HouseAction.HOUSE_ADD_TRAINING_EQUIPMENT:
            return {
                ...state,
                trainingEquipment: state.trainingEquipment.set(
                    action.payload.id,
                    action.payload
                ),
            };
        case HouseAction.HOUSE_UPDATE_TRAINING_EQUIPMENT_DONE:
            return {
                ...state,
                trainingEquipment: state.trainingEquipment.updateIn(
                    [action.payload, "done"],
                    (value: number) => (value = value + 1)
                ),
            };
        case HouseAction.HOUSE_TRAINING:
            return {
                ...state,
                trainingEquipment: state.trainingEquipment.updateIn(
                    [action.payload, "isTraining"],
                    (value: boolean) => !value
                ),
            };
        default:
            return state;
    }
}
