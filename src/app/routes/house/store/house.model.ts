export type TrainingType = "none" | "strength" | "endurance";
export type IdleType = "strength" | "endurance" | "gold";
export interface TrainingEquipment {
    id: TrainingType;
    cardHeader: string;
    name: string; //Displayed name
    bonus: number; // Bonus stat trainable default is 5xlevel. calculate in house.component.
    baseBonus: 0;
    speed: number;
    reward: number; //Number of stat gain each cycle
    description: string;
    done: number;
    isTraining: boolean;
}
