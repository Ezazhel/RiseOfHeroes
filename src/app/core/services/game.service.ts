import { MESSAGE } from "@core/constant/constant";
import { MessageService } from "./message.service";
import { Monster, Hero, Message } from "@core/models";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class GameService {
    player: Hero;
    monster: Monster;

    constructor(public messageService: MessageService) {
        console.log("Init Service");
        this.initialize();
    }
    initialize() {
        this.player = new Hero("Steven");
        console.log(this.player);

        this.monster = new Monster("Slime");
        console.log(this.monster);
    }
    startGame() {
        setInterval(() => {
            this.combat();
            if (this.player.isDead()) {
                this.messageService.addCombatMessage(`Vous êtes mort`);
                this.reset();
            } else if (this.monster.isDead()) {
                this.messageService.addCombatMessage(
                    `Vous avez tué ${this.monster.nom}`
                );
                this.messageService.addGeneralMessage(
                    `Vous avez gagné ${this.monster.level} expérience`
                );
                if (this.player.gainExperience(this.monster.level)) {
                    this.messageService.addGeneralMessage(
                        "Vous avez gagné un niveau"
                    );
                    this.monster.level++;
                }
                this.reset();
            }
        }, 1000);
    }

    combat() {
        this.player.takeDamage(this.monster.dealDamage());
        this.monster.takeDamage(this.player.dealDamage());
    }
    reset() {
        this.player.init();
        this.monster.init();
    }
}
