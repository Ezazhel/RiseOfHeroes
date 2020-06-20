import { createFeatureSelector, createSelector } from "@ngrx/store";
import { HouseState } from "./house.reducer";

export const houseStateSelector = createFeatureSelector<HouseState>("house");

export const trainingEquipement = createSelector(
    houseStateSelector,
    (houseState: HouseState) => houseState.trainingEquipment
);

export const work = createSelector(
    houseStateSelector,
    (houseState: HouseState) => houseState.work
);
