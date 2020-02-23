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
                this.messageService.add(
                    new Message(`Vous êtes mort`, MESSAGE.COMBAT)
                );
                this.reset();
            } else if (this.monster.isDead()) {
                this.messageService.add(
                    new Message(
                        `Vous avez tué ${this.monster.nom}`,
                        MESSAGE.GENERAL
                    )
                );
                this.messageService.add(
                    new Message(
                        `Vous avez gagné ${this.monster.level} expérience`,
                        MESSAGE.GENERAL
                    )
                );
                if (this.player.gainExperience(this.monster.level)) {
                    this.messageService.add(
                        new Message(
                            "Vous avez gagné un niveau",
                            MESSAGE.GENERAL
                        )
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
