import { Message } from "@core/models";
import { MESSAGE } from "@core/constant/constant";
import { MessageService } from "@core/services";
import { Component, OnInit } from "@angular/core";
@Component({
    selector: "app-message",
    templateUrl: "./message.component.html",
    styleUrls: ["./message.component.scss"]
})
export class MessageComponent implements OnInit {
    messages: Message[];
    constructor(public messageService: MessageService) {}

    ngOnInit() {
        this.messages = this.messageService.messages;
    }

    filterByType(type: String) {
        if (type == MESSAGE.ALL) {
            this.messages = this.messageService.messages;
        } else {
            this.messages = this.messageService.messages.filter(
                item => item.type == type
            );
        }
    }
}
