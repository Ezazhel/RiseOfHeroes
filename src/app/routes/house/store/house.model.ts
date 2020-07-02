import { Currency } from "@core/models/game-data/game-data.model";

export type TrainingType = "none" | "strength" | "endurance";
export type WorkingType =
    | "none"
    | "miner"
    | "lumberjack"
    | "peasant"
    | "mayor"
    | "artist";

export type IdleType = "strength" | "endurance" | "gold";

export interface IdlingHouse {
    name: string; //Displayed name
    cardHeader: string;
    reward: number;
    baseReward?: number;
    speed: number;
    description: string;
    isActive: boolean;
    done: number;
}
export interface TrainingEquipment extends IdlingHouse {
    id: string;
    type: TrainingType;
    bonus: number; // Bonus stat trainable default is 5xlevel. calculate in house.component.
    baseBonus: number;
    done: number;
}

export interface Work extends IdlingHouse {
    id: WorkingType;
    currency: Currency;
    level: number;
    promotion: number;
    basePromotion: number;
}

export type ConstructionType = "sawmill" | "mine";
export interface Construction {
    id: ConstructionType;
    name: string;
    description: string;
    cost: Currency[];
    built?: boolean;
    required?: ConstructionType;
}
