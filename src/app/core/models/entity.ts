export class Entity {
    constructor(nom: string) {
        this.nom = nom;
        this.level = 1;
    }
    nom: string;
    level: number;
    currentHp: number;
    damage: number;

    getHealthFormula(): number {
        return 0;
    }
    getDamageFormula(): number {
        return 0;
    }

    takeDamage(damage: number) {
        this.currentHp -= damage;
    }
    dealDamage(): number {
        return this.damage; //Multiply by Const
    }

    init() {
        this.currentHp = this.getHealthFormula();
        this.damage = this.getDamageFormula();
    }
    getHp(): string {
        return `${this.currentHp}/${this.getHealthFormula()}`;
    }

    getHpPercent(): number {
        return (this.currentHp / this.getHealthFormula()) * 100;
    }
    isDead(): boolean {
        if (this.currentHp < 0) {
            this.init();
            return true;
        }
        return false;
    }
    getExperience() {}
    getPercentExperience() {}
}
