export type TrainingType = "none" | "strength" | "endurance";
export type WorkingType = "none" | "peasant" | "mayor" | "artist";

export type IdleType = "strength" | "endurance" | "gold";

export interface IdlingHouse {
    name: string; //Displayed name
    cardHeader: string;
    reward: number;
    speed: number;
    description: string;
    isActive: boolean;
    done: number;
}
export interface TrainingEquipment extends IdlingHouse {
    id: TrainingType;
    bonus: number; // Bonus stat trainable default is 5xlevel. calculate in house.component.
    baseBonus: 0;
    done: number;
}

export interface Work extends IdlingHouse {
    id: WorkingType;
}
