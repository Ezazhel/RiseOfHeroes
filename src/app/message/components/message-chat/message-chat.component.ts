import { Component, OnInit, Input } from "@angular/core";
import { Message } from "@core/models/message";
import { Observable } from "rxjs";
@Component({
    selector: "app-message-chat",
    templateUrl: "./message-chat.component.html",
    styleUrls: ["./message-chat.component.scss"]
})
export class MessageChatComponent implements OnInit {
    @Input("messages") messages: Message[] = [];

    constructor() {}

    ngOnInit(): void {}

    trackBy(index: number, item: Message): Message {
        return item;
    }
}
