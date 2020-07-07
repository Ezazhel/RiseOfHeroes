import { createFeatureSelector, createSelector } from "@ngrx/store";
import { HouseState } from "./house.reducer";
import { constructionData, worksData } from "./house.data";

export const houseStateSelector = createFeatureSelector<HouseState>("house");

export const trainingEquipement = createSelector(
    houseStateSelector,
    (houseState: HouseState) => houseState.trainingEquipment
);

export const works = createSelector(
    houseStateSelector,
    (houseState: HouseState) => {
        if (houseState.works) {
            return Object.keys(houseState.works).map((idWork) => {
                return {
                    ...houseState.works[idWork],
                    upgrade: worksData.get(idWork).upgrade,
                };
            });
        } else {
            return null;
        }
    }
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
