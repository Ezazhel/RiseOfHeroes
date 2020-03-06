import { Entity } from "./entity";
export class Hero extends Entity {
    constructor(nom: string) {
        super(nom);
        this.init();
    }
    experience: number = 0;
    getExperienceFormula(): number {
        return 2 * this.level;
    }
    getHealthFormula(): number {
        return 200 * this.level;
    }
    getDamageFormula(): number {
        return 25 * this.level;
    }

    gainExperience(exp: number): boolean {
        this.experience += exp;
        if (this.experience >= this.getExperienceFormula()) {
            this.experience = this.getExperienceFormula() - this.experience;
            this.level++;
            this.init();
            return true;
        }
        return false;
    }

    getExperience(): string {
        return `${
            this.experience
        }/${this.getExperienceFormula()}(${this.getPercentExperience().toFixed(
            2
        )})`;
    }

    getPercentExperience(): number {
        return (this.experience / this.getExperienceFormula()) * 100;
    }
}
