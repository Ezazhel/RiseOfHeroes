import { Action } from "@ngrx/store";
import { TrainingEquipment, TrainingType } from "./house.model";
export const HOUSE_ADD_TRAINING_EQUIPMENT = "[house] add training equipment";
export const HOUSE_UPDATE_TRAINING_EQUIPMENT_BONUS =
    "[house] update training equipment bonus";
export const HOUSE_UPDATE_TRAINING_EQUIPMENT_DONE =
    "[house] update training equipment done";
export const HOUSE_TRAINING = "[house] is training";
"[house] update training equipment done";
export class HouseAddTrainingEquipment implements Action {
    readonly type = HOUSE_ADD_TRAINING_EQUIPMENT;
    constructor(public payload: TrainingEquipment) {}
}

export class HouseUpdateTrainingEquipmentBonus implements Action {
    readonly type = HOUSE_UPDATE_TRAINING_EQUIPMENT_BONUS;
    constructor(public payload: number) {}
}

export class HouseUpdateTrainingEquipmentDone implements Action {
    readonly type = HOUSE_UPDATE_TRAINING_EQUIPMENT_DONE;
    constructor(public payload: TrainingType) {}
}
export class HouseTraining implements Action {
    readonly type = HOUSE_TRAINING;
    constructor(public payload: TrainingType) {}
}
export type HouseActionType =
    | HouseAddTrainingEquipment
    | HouseUpdateTrainingEquipmentBonus
    | HouseUpdateTrainingEquipmentDone
    | HouseTraining;
