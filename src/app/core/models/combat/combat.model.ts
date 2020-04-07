import { BaseEntity, Entity } from "../base-entity";
import { Observable } from "rxjs";

export type CombatType = "none" | "fixed" | "random";

/** A combatant in a combat encounter */
export interface Combatant extends BaseEntity {
    /** The name of the combatant */
    readonly name?: string;
    /** The experience awarded for defeating this combatant */
    readonly exp?: number;
    /** The gold that can be looted aftefor defeating this combatant */
    readonly gold?: number;
}
/**
 * A Combat encounter descriptor.  Used to describe the configuration of combat.
 */
export interface CombatEncounter {
    /** The type of combat */
    readonly type: CombatType;
    /** array of enemies in this encounter */
    readonly monster: Combatant;

    readonly hero: Entity;
    /** message to display when combat begins */
    readonly message?: string[];
    /** The amount of gold to award the player after a victory */
    readonly gold?: number;
    /** The experience after a victory */
    readonly experience?: number;
    /** Any items to award the hero after a victory */
    readonly items?: null;
    /** The combat zone name, e.g. 'world-plains', 'sewer', ... */
    readonly zone?: string;
}
/** Description of a combat attackCombatant */
export interface CombatAttack {
    damage: number;
    attacker: BaseEntity;
    defender: BaseEntity;
}
