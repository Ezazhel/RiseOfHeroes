import { Message } from "@core/models/message";
import { Injectable } from "@angular/core";
import { MESSAGE } from "@core/constant/constant";
import { ReplaySubject } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class MessageService {
    messages: Message[] = [];
    filteredMessages: ReplaySubject<Message[]> = new ReplaySubject(1);
    filter: String;

    private add(message: String, type: string) {
        this.messages.push(new Message(message, type));
        this.filterMessages();
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
    setFilter(filter: String) {
        this.filter = filter;
    }
    filterMessages() {
        if (this.filter === MESSAGE.ALL) {
            this.filteredMessages.next(this.messages);
        } else {
            this.filteredMessages.next(
                this.messages.filter(item => item.type === this.filter)
            );
        }
    }
    constructor() {}
}
