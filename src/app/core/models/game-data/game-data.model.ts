import { newGuid } from "../utils";
import { EntityType } from "../entity";

export type ItemCategories = "item" | "weapon" | "armor";

export type ItemSellableType = "equipment" | "consumable";

export type ItemFilter = "all" | "item" | "weapon" | "armor";

export type ItemGroups = "default" | "rare" | "magic";

export type ItemElements = "holy" | "water" | "wind" | "heal";

export type ItemArmorType = "chest" | "helm" | "boots" | "shield";

export type WeaponCategory = "sword" | "hammer" | "spear" | "dagger";

export type WeaponHandling = "2h" | "1h";

export interface Currency {
    readonly name: string;
    readonly quantity: number;
    readonly icon?: string; //sprite image
}

export interface Stat {
    name: string;
    value: number;
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
    readonly icon: string;

    readonly style: string;
    /**
     * The value of the object. This is used for buying/selling.
     */
    readonly value: number;
    /**
     * Human readable item name, e.g. "Short Sword"
     */
    readonly name: string;
    /**
     * The level of the weapon.
     */
    readonly level: number;
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
    readonly groups?: ItemGroups[];
}

export interface ITemplateItem extends ITemplateBaseItem {
    readonly type: "item";
}

export interface ITemplateBaseEquipmennt extends ITemplateBaseItem {
    stats?: Stat[];
}
export interface ITemplateWeapon extends ITemplateBaseEquipmennt {
    readonly type: "weapon";

    weaponCategory: WeaponCategory;
    weaponHandling: WeaponHandling;

    /**
     * The attack value for this weapon.
     */
    attack: number;
}
export interface ITemplateArmor extends ITemplateBaseEquipmennt {
    /**
     * What part of the body does the armor apply to?
     */
    readonly type: "armor";

    readonly subType: ItemArmorType;
    /**
     * The defensive rating of this piece of armor.
     */
    readonly armor: number;
}

/**
 * Instantiate an item from its template and assign it a unique eid value.
 * @param from The ITemplateId to stamp out a copy of
 * @param values Any optional values to assign to the instance during creation
 */
export function instantiateEntity<T extends ITemplateId>(
    from: any,
    values?: Partial<T>
): T {
    return Object.assign(
        {
            eid: entityId(from.id),
        },
        from,
        values || {}
    ) as T;
}

/** Generate a UUID for a given input template ID that is unique across all instances of the same template base */
export function entityId(id: string): string {
    return `${id}-${newGuid()}`;
}
