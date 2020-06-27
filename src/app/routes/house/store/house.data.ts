import {
    Work,
    WorkingType,
    ConstructionType,
    Construction,
} from "./house.model";
import { Currency } from "@core/models/game-data/game-data.model";
import { Store } from "@ngrx/store";
import { NotifierService } from "@core/services/notifier.service";
import { HouseBuild } from "./house.action";

const setWork = (id: WorkingType, currency: Currency): Work => ({
    id: id,
    cardHeader: `house.work.${id}.name`,
    name: `house.work.${id}.name`,
    description: `house.work.${id}.description`,
    reward: 1,
    speed: 1 * 1000,
    isActive: false,
    currency: currency,
    done: 0,
});

export const worksData: Map<WorkingType, Work> = new Map<WorkingType, Work>([
    ["peasant", setWork("peasant", { name: "gold", quantity: 1 })],
    ["miner", setWork("miner", { name: "stone", quantity: 2 })],
    ["lumberjack", setWork("lumberjack", { name: "wood", quantity: 2 })],
    ["mayor", setWork("mayor", { name: "gold", quantity: 100 })],
    ["artist", setWork("artist", { name: "gold", quantity: 1000 })],
]);

const setConstruction = (
    id: ConstructionType,
    cost: Currency[]
): Construction => ({
    id: id,
    required: null,
    cost: cost,
    description: `house.construction.${id}.description`,
    name: `house.construction.${id}.name`,
});
export const constructionData: Map<ConstructionType, Construction> = new Map<
    ConstructionType,
    Construction
>([
    ["sawmill", setConstruction("sawmill", [{ name: "gold", quantity: 100 }])],
    ["mine", setConstruction("mine", [{ name: "gold", quantity: 250 }])],
]);

type ConstructionEffect = (store: Store, _notifier: NotifierService) => void;
export const constructionEffects: Map<
    ConstructionType,
    ConstructionEffect
> = new Map<ConstructionType, ConstructionEffect>([
    [
        "sawmill",
        (store, _notifier) => {
            store.dispatch(
                new HouseBuild("sawmill", worksData.get("lumberjack"))
            );
            _notifier.notify("Built add trad", "", "text");
        },
    ],
    [
        "mine",
        (store, _notifier) => {
            store.dispatch(new HouseBuild("mine", worksData.get("miner")));
            _notifier.notify("Built add trad", "", "text");
        },
    ],
]);