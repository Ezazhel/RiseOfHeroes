import { TrainingEquipment, TrainingType, Work } from "./house.model";
import * as HouseAction from "./house.action";
import { updateInsert, update } from "@core/models/utils";

const initialState: HouseState = {
    trainingEquipment: [
        {
            id: "strength",
            cardHeader: "house.training.strength.cardHeader",
            name: "house.training.strength.level1.name ",
            description: "house.training.strength.level1.description",
            bonus: 0,
            baseBonus: 0,
            speed: 10 * 1000,
            reward: 1,
            done: 0,
            isActive: false,
        },
        {
            id: "endurance",
            cardHeader: "house.training.endurance.cardHeader",
            name: "house.training.endurance.level1.name",
            description: "house.training.endurance.level1.description",
            bonus: 0,
            baseBonus: 0,
            speed: 10 * 1000,
            reward: 1,
            done: 0,
            isActive: false,
        },
    ],
    work: {
        id: "peasant",
        cardHeader: "house.work.peasant.name",
        name: "house.work.peasant.name",
        description: "house.work.peasant.description",
        reward: 1,
        speed: 1 * 1000,
        isActive: false,
        done: 0,
    },
};

export interface HouseState {
    trainingEquipment: Array<TrainingEquipment>;
    work: Work;
}

export function houseReducer(
    state: HouseState = initialState,
    action: HouseAction.HouseActionType
) {
    switch (action.type) {
        case HouseAction.HOUSE_UPDATE_TRAINING_EQUIPMENT_BONUS:
            return {
                ...state,
                trainingEquipment: state.trainingEquipment.map((value, key) => {
                    return {
                        ...value,
                        bonus: value.baseBonus + 5 * action.payload,
                    };
                }),
            };
        case HouseAction.HOUSE_ADD_TRAINING_EQUIPMENT:
            return {
                ...state,
                trainingEquipment: updateInsert(
                    state.trainingEquipment,
                    (t: TrainingEquipment) => t.id == action.payload.id,
                    (t: TrainingEquipment) => action.payload,
                    action.payload
                ),
            };
        case HouseAction.HOUSE_UPDATE_TRAINING_EQUIPMENT_DONE:
            return {
                ...state,
                trainingEquipment: update(
                    state.trainingEquipment,
                    (t: TrainingEquipment) => t.id == action.payload,
                    (t: TrainingEquipment) => {
                        return {
                            ...t,
                            done: t.done + 1,
                            isActive: false,
                        };
                    }
                ),
            };
        case HouseAction.HOUSE_TRAINING:
            return {
                ...state,
                trainingEquipment: update(
                    [...state.trainingEquipment].map((t) => {
                        return t.id != action.payload
                            ? { ...t, isActive: false }
                            : t;
                    }),
                    (t: TrainingEquipment) => t.id == action.payload,
                    (t: TrainingEquipment) => {
                        return { ...t, isActive: !t.isActive };
                    }
                ),
            };
        default:
            return state;
    }
}
