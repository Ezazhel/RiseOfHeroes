import { createFeatureSelector, createSelector } from "@ngrx/store";
import { HouseState } from "./house.reducer";
import { constructionData } from "./house.data";

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
    (houseState: HouseState) => {
        if (houseState.constructions) {
            return Object.keys(houseState.constructions).map(
                (idConstruction) => {
                    return {
                        ...constructionData.get(idConstruction),
                        built: houseState.constructions[idConstruction],
                    };
                }
            );
        } else {
            return null;
        }
    }
);
