import {
    Work,
    WorkingType,
    Construction,
    ConstructionEffect,
    WorkEffect,
} from "./house.model";
import { Currency } from "@core/models/game-data/game-data.model";
import { HouseBuild, HousePromotion } from "./house.action";
import { levelUp } from "@core/models/level";

const setWork = (
    id: string,
    currency: Currency,
    upgrade: WorkEffect
): Work => ({
    id: id,
    cardHeader: `house.work.${id}.name`,
    name: `house.work.${id}.name`,
    description: `house.work.${id}.description`,
    baseReward: 1,
    reward: 1,
    speed: 1 * 1000,
    isActive: false,
    currency: currency,
    done: 0,
    level: 1,
    basePromotion: 50,
    promotion: 50,
    upgrade,
});

export const worksData: Map<string, Work> = new Map<string, Work>([
    [
        "peasant",
        setWork(
            "peasant",
            { name: "gold", quantity: 1 },
            (store, notifier, work) => {
                if (
                    work.level < 8 &&
                    work.done == work.level * work.basePromotion
                ) {
                    //lvl 8 stop promotion.
                    //update add Construction to update work.
                    work = {
                        ...work,
                        level: work.level + 1,
                        done: 0,
                        currency: {
                            ...work.currency,
                            quantity:
                                work.level == 5
                                    ? work.currency.quantity * 10
                                    : work.currency.quantity * 2,
                        },
                    };
                    store.dispatch(new HousePromotion(work));
                    notifier.notify("text", "promote", `${work.name}`, 2000); //unlock promote work
                }
                return work;
            }
        ),
    ],
    [
        "miner",
        setWork(
            "miner",
            { name: "stone", quantity: 2 },
            (store, notifier, work) => {
                return work;
            }
        ),
    ],
    [
        "lumberjack",
        setWork(
            "lumberjack",
            { name: "wood", quantity: 2 },
            (store, notifier, work) => {
                return work;
            }
        ),
    ],
    [
        "mayor",
        setWork(
            "mayor",
            { name: "gold", quantity: 100 },
            (store, notifier, work) => {
                return work;
            }
        ),
    ],
    [
        "artist",
        setWork(
            "artist",
            { name: "gold", quantity: 1000 },
            (store, notifier, work) => {
                return work;
            }
        ),
    ],
]);

const setConstruction = (
    id: string,
    cost: Currency[],
    effect: ConstructionEffect
): Construction => ({
    id: id,
    required: null,
    cost: cost,
    built: false,
    description: `house.construction.${id}.description`,
    name: `house.construction.${id}.name`,
    effect,
});
export const constructionData: Map<string, Construction> = new Map<
    string,
    Construction
>([
    [
        "sawmill",
        setConstruction(
            "sawmill",
            [{ name: "gold", quantity: 100 }],
            (store, _notifier) => {
                store.dispatch(
                    new HouseBuild("sawmill", worksData.get("lumberjack"))
                );
                _notifier.notify(
                    "text",
                    "unlock",
                    worksData.get("lumberjack").name
                );
            }
        ),
    ],
    [
        "mine",
        setConstruction(
            "mine",
            [{ name: "gold", quantity: 250 }],
            (store, _notifier) => {
                store.dispatch(new HouseBuild("mine", worksData.get("miner")));
                _notifier.notify("text", "unlock", worksData.get("miner").name);
            }
        ),
    ],
]);
