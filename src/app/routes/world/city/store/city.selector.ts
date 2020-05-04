import { CitiesState } from "./cities.reducer";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { City } from "./cities.model";
import { Map } from "immutable";

export const citiesStateSelector = createFeatureSelector<CitiesState>("cities");

export const citySelector = (cityId: string) =>
    createSelector(citiesStateSelector, (state: CitiesState) =>
        state.cities.get(cityId)
    );

export const shopSelector = (cityId: string, shopId: string) =>
    createSelector(citySelector(cityId), (city: City) =>
        city.shops.get(shopId)
    );
