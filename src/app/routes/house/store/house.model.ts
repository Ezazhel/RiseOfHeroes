import { Currency } from "@core/models/game-data/game-data.model";
import { NotifierService } from "@core/services/notifier.service";
import { Store } from "@ngrx/store";

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
export type ConstructionEffect = (
    store: Store,
    _notifier: NotifierService
) => void;
export interface Construction {
    id: string;
    name: string;
    description: string;
    cost: Currency[];
    built: boolean;
    maxLevel?: number;
    required?: string;
    effect?: ConstructionEffect;
}
