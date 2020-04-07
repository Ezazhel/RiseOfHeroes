import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { MESSAGE } from "@core/constant/constant";
import { MessageService } from "@core/services";
@Component({
    selector: "app-message-button-menu",
    templateUrl: "./message-button-menu.component.html",
    styleUrls: ["./message-button-menu.component.scss"]
})
export class MessageButtonMenuComponent implements OnInit {
    MESSAGE;
    activeButton: String;
    constructor(private messageService: MessageService) {}

    ngOnInit(): void {
        this.MESSAGE = MESSAGE;
        this.activeButton = MESSAGE.ALL;
    }

    filterByType(type: string) {
        this.messageService.setFilter(type);
    }
}
