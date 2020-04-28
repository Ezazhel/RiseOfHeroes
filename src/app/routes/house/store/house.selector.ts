import { createFeatureSelector, createSelector } from "@ngrx/store";
import { HouseState } from "./house.reducer";

export const houseStateSelector = createFeatureSelector<HouseState>(
    "houseState"
);

export const trainingEquipement = createSelector(
    houseStateSelector,
    (houseState: HouseState) => houseState.trainingEquipment
);
