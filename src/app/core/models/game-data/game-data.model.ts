import { EntityType } from "../entity/entity";
import { CurrencyType } from "./game-data.data";
import { Rune } from "../runes/runes.model";
import { NotifierService } from "@core/services/notifier.service";

export type BuffType =
    | "armor"
    | "intellect"
    | "agility"
    | "reward"
    | "gold"
    | "ressource"
    | "strength"
    | "stat"
    | "endurance"
    | "lifesteal"
    | "apenetration"
    | "loot"
    | "lootdrop"
    | "critc"
    | "critd"
    | "work"
    | "worker"
    | "craft"
    | "speed";
export type PassiveMethod = (notifier?: NotifierService) => Buff;
export type ItemCategories = "item" | "weapon" | "armor";

export type ItemSellableType = "equipment" | "consumable";

export type ItemFilter = "all" | "item" | "weapon" | "armor";

export type ItemQuality = "common" | "uncommon" | "rare" | "epic" | "legendary";

export type ItemElements = "holy" | "water" | "wind" | "heal";

export type ArmorCategory = "chest" | "helmet" | "boots" | "pants" | "gloves";

export type WeaponCategory = "sword" | "hammer" | "dagger" | "axe";

export type WeaponHandling = "2h" | "1h";

export type StatType =
    | "armor"
    | "strength"
    | "endurance"
    | "intellect"
    | "agility";

export interface Currency {
    readonly name: CurrencyType;
    readonly quantity: number;
    readonly icon?: string; //sprite image
}

export interface Stat {
    type: StatType;
    name: string;
    value: number;
}

export interface Buff {
    type: BuffType;
    add: number;
    mult: number;
}
export interface StatChange {
    armor?: number;
    stats?: Stat[];
}
export interface ITemplateId {
    /**
     * The lowercase-hyphenated string id of the item. This can be used to look the id up in the table.
     */
    readonly id: string;
}

export interface ITemplateBaseItem extends ITemplateId {
    /** Each type specifies this */
    readonly type: ItemCategories;

    /**
     * The sprite icon name to use to render the item, e.g. "shortSword.png", "bluePotion.png".
     * Note that the icon must exist in the game's sprites collection to be valid.
     */
    readonly icon?: string;

    /**
     * The value of the object. This is used for buying/selling.
     */
    readonly value?: number;
    /**
     * Human readable item name, e.g. "Short Sword"
     */
    readonly name?: string;
    /**
     * The level of the weapon.
     */
    readonly level?: number;
    /**
     * This object is only used by the given types of entities {@see EntityType}
     */
    readonly usedby?: EntityType[];
    /**
     * Any elements this item aligns with.
     */
    readonly elements?: ItemElements[];

    /**
     * Any logical groups of items this object matches, e.g. "rare", "magic"
     */
    readonly quality?: ItemQuality;

    readonly subType?: any;
}

export interface ITemplateBaseEquipment extends ITemplateBaseItem {
    stats?: Stat[];
    runes?: Rune[];
}
export interface ITemplateWeapon extends ITemplateBaseEquipment {
    readonly type: "weapon";

    readonly subType?: WeaponCategory;
    weaponHandling?: WeaponHandling;

    /**
     * The attack value for this weapon.
     */
    attack?: number;
    dps?: number;
    speed?: number;
}
export interface ITemplateArmor extends ITemplateBaseEquipment {
    /**
     * What part of the body does the armor apply to?
     */
    readonly type: "armor";

    readonly subType: ArmorCategory;
    /**
     * The defensive rating of this piece of armor.
     */
    readonly armor?: number;
}
export interface Description {
    param?: any;
    param2?: any;
    jsonField?: string;
}

export type LootBagPossibleReward =
    | "weapon"
    | "armor"
    | "currency"
    | "Rune"
    | "none";
export interface LootbagItem {
    item: LootBagPossibleReward;
    rune?: Rune;
    currency?: Currency;
    itemQuality?: ItemQuality;
    weigth: number;
    rangeFrom?: number;
    rangeTo?: number;
    maxQuantity?: number;
}
export interface Reward {
    rewardType: LootBagPossibleReward;
    reward: ITemplateBaseItem | Currency | Rune;
}
