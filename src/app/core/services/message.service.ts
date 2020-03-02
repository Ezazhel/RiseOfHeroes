import { Message } from "@core/models/message";
import { Injectable } from "@angular/core";
import { MESSAGE } from "@core/constant/constant";

@Injectable({
    providedIn: "root"
})
export class MessageService {
    messages: Message[] = [];

    private add(message: String, type: string) {
        this.messages.push(new Message(message, type));
    }
    addGeneralMessage(message: String) {
        this.add(message, MESSAGE.GENERAL);
    }
    addCombatMessage(message: String) {
        this.add(message, MESSAGE.COMBAT);
    }
    clear() {
        this.messages = [];
    }
    constructor() {}
}
