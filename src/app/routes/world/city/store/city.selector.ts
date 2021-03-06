import { CitiesState } from "./cities.reducer";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { City } from "./cities.model";

export const citiesStateSelector = createFeatureSelector<CitiesState>("cities");

export const citiesSelector = createSelector(
    citiesStateSelector,
    (state: CitiesState) => state.cities
);

export const citySelector = (cityId: string) =>
    createSelector(citiesStateSelector, (state: CitiesState) =>
        state.cities.find((c) => c.id == cityId)
    );

export const shopSelector = (cityId: string, shopType: string) =>
    createSelector(citySelector(cityId), (city: City) =>
        city.shops.find((s) => s.type == shopType)
    );
