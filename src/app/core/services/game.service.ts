import { MessageService } from "./message.service";
import { Monster, Hero } from "@core/models";
import { Injectable } from "@angular/core";
import { TranslocoService } from "@ngneat/transloco";

@Injectable({
    providedIn: "root"
})
export class GameService {
    player: Hero;
    monster: Monster;

    constructor(
        public messageService: MessageService,
        private translate: TranslocoService
    ) {
        this.initialize();
    }
    initialize() {
        this.player = new Hero("Steven");

        this.monster = new Monster("Slime");
    }
    startGame() {
        setInterval(() => {
            this.combat();
            if (this.player.isDead()) {
                this.messageService.addCombatMessage(
                    this.translate.selectTranslate("combatLog.died")
                );
                this.reset();
            } else if (this.monster.isDead()) {
                this.messageService.addCombatMessage(
                    this.translate.selectTranslate("combatLog.monsterKilled", {
                        monster: this.monster.nom
                    })
                );
                this.messageService.addGeneralMessage(
                    this.translate.selectTranslate("combatLog.expEarn", {
                        exp: this.monster.level
                    })
                );
                if (this.player.gainExperience(this.monster.level)) {
                    this.messageService.addGeneralMessage(
                        this.translate.selectTranslate("combatLog.levelUp")
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
