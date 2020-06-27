import { createFeatureSelector, createSelector } from "@ngrx/store";
import { HouseState } from "./house.reducer";

export const houseStateSelector = createFeatureSelector<HouseState>("house");

export const trainingEquipement = createSelector(
    houseStateSelector,
    (houseState: HouseState) => houseState.trainingEquipment
);

export const works = createSelector(
    houseStateSelector,
    (houseState: HouseState) => houseState.works
);

export const constructions = createSelector(
    houseStateSelector,
    (houseState: HouseState) => houseState.constructions
);
