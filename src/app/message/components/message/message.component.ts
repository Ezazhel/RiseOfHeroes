import { Message } from "@core/models";
import { MESSAGE } from "@core/constant/constant";
import { MessageService } from "@core/services";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
@Component({
    selector: "app-message",
    templateUrl: "./message.component.html",
    styleUrls: ["./message.component.scss"]
})
export class MessageComponent implements OnInit {
    messages: Message[] = [];

    constructor(public messageService: MessageService) {}

    ngOnInit() {
        this.messageService.setFilter(MESSAGE.ALL);
        this.messageService.filteredMessages.subscribe(
            messages => (this.messages = messages)
        );
    }
    filterByType(type: string) {
        this.messageService.setFilter(type);

        if (type === MESSAGE.ALL) {
            this.messages = this.messageService.messages;
        } else {
            this.messages = this.messageService.messages.filter(
                messages => messages.type === type
            );
        }
    }
}
