import { Entity } from "./entity";
export class Monster extends Entity {
  constructor(nom: string) {
    super(nom);
    this.init();
  }
  getDamageFormula(): number {
    return 15 * this.level;
  }
  getHealthFormula(): number {
    return 125 * this.level;
  }
}
