import { worksData, constructionData } from "./house.data";
import {
    TrainingEquipment,
    Work,
    Construction,
    WorkingType,
} from "./house.model";
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
            speed: 5 * 1000,
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
            speed: 5 * 1000,
            reward: 1,
            done: 0,
            isActive: false,
        },
    ],
    works: { ["peasant"]: worksData.get("peasant") },
    constructions: [...constructionData.values()].reduce((acc, cur) => {
        acc[cur.id] = cur.built;
        return acc;
    }, {}),
};

export interface HouseState {
    trainingEquipment: Array<TrainingEquipment>;
    works: { [workId: string]: Work };
    constructions: { [constructionId: string]: boolean };
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
                works: Object.keys(state.works)
                    .map((t) => ({
                        ...state.works[t],
                        isActive: false,
                    }))
                    .reduce((acc, cur) => {
                        acc[cur.id] = cur;
                        return acc;
                    }, {}),
            };
        case HouseAction.HOUSE_WORKING:
            let works = { ...state.works };
            Object.keys(works).forEach((t) => {
                works[t] = { ...works[t], isActive: false };
                if (action.payload != null && t === action.payload.id) {
                    works[t] = {
                        ...works[t],
                        isActive: !works[t].isActive,
                        done: action.payload.done,
                    };
                }
            });
            return {
                ...state,
                works,
                trainingEquipment: [...state.trainingEquipment].map((t) => ({
                    ...t,
                    isActive: false,
                })),
            };
        case HouseAction.HOUSE_PROMOTION:
            return {
                ...state,
                works: { ...state.works, [action.payload.id]: action.payload },
            };
        case HouseAction.HOUSE_BUILD:
            return {
                ...state,
                constructions: {
                    ...state.constructions,
                    [action.payload]: true,
                },
                works: {
                    ...state.works,
                    [action.workToAdd.id]: action.workToAdd,
                },
            };
        default:
            return state;
    }
}
