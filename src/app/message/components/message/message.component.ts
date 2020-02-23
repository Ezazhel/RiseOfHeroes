import { MessageService } from "@core/services";
import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-message",
    templateUrl: "./message.component.html",
    styleUrls: ["./message.component.scss"]
})
export class MessageComponent implements OnInit {
    constructor(public messageService: MessageService) {}

    ngOnInit() {}
}
