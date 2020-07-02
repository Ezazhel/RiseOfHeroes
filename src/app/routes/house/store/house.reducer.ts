import { worksData, constructionData } from "./house.data";
import { TrainingEquipment, Work, Construction } from "./house.model";
import * as HouseAction from "./house.action";
import { updateInsert, update } from "@core/models/utils";

const initialState: HouseState = {
    trainingEquipment: [
        {
            id: "strength",
            type: "strength",
            cardHeader: "house.training.strength.cardHeader",
            name: "house.training.strength.level1.name",
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
            type: "endurance",
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
    works: [{ ...worksData.get("peasant") }],
    constructions: Array.from(constructionData.values()),
};

export interface HouseState {
    trainingEquipment: Array<TrainingEquipment>;
    works: Work[];
    constructions: Construction[];
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
            console.log(action.payload);
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
                    (t: TrainingEquipment) => t.id == action.payload.id,
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
                        return t.id != action.payload.id
                            ? { ...t, isActive: false }
                            : t;
                    }),
                    (t: TrainingEquipment) => t.id == action.payload.id,
                    (t: TrainingEquipment) => {
                        return { ...t, isActive: !t.isActive };
                    }
                ),
                works: [...state.works].map((t) => ({
                    ...t,
                    isActive: false,
                })),
            };
        case HouseAction.HOUSE_WORKING:
            return {
                ...state,
                works: update(
                    [...state.works].map((t) => {
                        return t.id != action.payload
                            ? { ...t, isActive: false }
                            : t;
                    }),
                    (t: Work) => t.id == action.payload,
                    (t: Work) => ({
                        ...t,
                        isActive: !t.isActive,
                        done: t.done + 1,
                    })
                ),
                trainingEquipment: [...state.trainingEquipment].map((t) => ({
                    ...t,
                    isActive: false,
                })),
            };
        case HouseAction.HOUSE_PROMOTION:
            return {
                ...state,
                works: update(
                    [...state.works],
                    (t: Work) => t.id == action.payload.id,
                    (t: Work) => action.payload
                ),
            };
        case HouseAction.HOUSE_BUILD:
            return {
                ...state,
                constructions: update(
                    state.constructions,
                    (c: Construction) => c.id === action.payload,
                    (c: Construction) => ({
                        ...c,
                        built: true,
                    })
                ),
                works: updateInsert(
                    state.works,
                    (t: Work) => t.id == action.workToAdd.id,
                    (t: Work) => ({ ...t, isActive: !t.isActive }),
                    action.workToAdd
                ),
            };
        default:
            return state;
    }
}
