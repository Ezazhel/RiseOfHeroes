import { Message } from "./../models/message";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class MessageService {
    messages: Message[] = [];

    add(message: Message) {
        console.log(message);
        this.messages.push(message);
    }

    clear() {
        this.messages = [];
    }
    constructor() {}
}
