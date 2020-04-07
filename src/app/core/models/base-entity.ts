export type EntityType = "hero" | "monster";
export type EntityClass = "warrior" | "mage" | "ranger" | "peasant";

export interface TemplateEntity {
    readonly icon?: string; // sprite icon
    readonly level: number;
    readonly ressource: number; //Mana / Rage / Energy
    readonly hp: number;
    readonly attack: number; // Damage done
    readonly defense: number; //Percent reduction of damage
    readonly magic?: number;
    readonly speed: number; //Determine attack speed
}
export interface IHiddenAttributes {
    /**
     * Base attack value
     */
    readonly baseattack: number;
    /**
     * Base defense value
     */
    readonly basedefense: number;
    /**
     * Base magic value
     */
    readonly basemagic: number;
    /**
     * Base speed value
     */
    readonly basespeed: number;
}

export interface BaseEntity extends TemplateEntity {
    readonly maxressource: number;
    readonly maxhp: number;
}

export interface EntitySlots {
    weapon?: null;
    armor?: null;
    boots?: null;
    helm?: null;
    shield?: null;
    accessory?: null; //Array of Accessories
    consumable?: null; // Potion / Usable
}

export interface Entity extends BaseEntity, EntitySlots, IHiddenAttributes {
    readonly type: EntityType;
    readonly entityclass?: EntityClass;
    readonly exp: number;
}
