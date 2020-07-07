import { Action } from "@ngrx/store";
import { TrainingEquipment, WorkingType, Work } from "./house.model";
export const HOUSE_ADD_TRAINING_EQUIPMENT = "[house] add training equipment";
export const HOUSE_UPDATE_TRAINING_EQUIPMENT_BONUS =
    "[house] update training equipment bonus";
export const HOUSE_UPDATE_TRAINING_EQUIPMENT_DONE =
    "[house] update training equipment done";
export const HOUSE_TRAINING = "[house] is training";
export const HOUSE_WORKING = "[house] is working";
export const HOUSE_PROMOTION = "[house] promote";

export const HOUSE_BUILD = "[house] build something";
export const HOUSE_ADD_CONSTRUCTION = "[house] unlock construction";

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
    constructor(public payload: TrainingEquipment) {}
}
export class HouseTraining implements Action {
    readonly type = HOUSE_TRAINING;
    constructor(public payload: TrainingEquipment) {}
}
export class HouseWorking implements Action {
    readonly type = HOUSE_WORKING;
    constructor(public payload: Work) {}
}
export class HousePromotion implements Action {
    readonly type = HOUSE_PROMOTION;
    constructor(public payload: Work) {}
}

export class HouseBuild implements Action {
    readonly type = HOUSE_BUILD;
    constructor(public payload: string, public workToAdd: Work) {}
}

export class HouseAddConstruction implements Action {
    readonly type = HOUSE_ADD_CONSTRUCTION;
    constructor(public payload: string) {}
}
export type HouseActionType =
    | HouseAddTrainingEquipment
    | HouseUpdateTrainingEquipmentBonus
    | HouseUpdateTrainingEquipmentDone
    | HouseTraining
    | HouseWorking
    | HousePromotion
    | HouseBuild;
