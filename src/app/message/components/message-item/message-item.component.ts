import { Component, OnInit, Input } from "@angular/core";
import { Message } from "@core/models";
@Component({
    selector: "app-message-item",
    templateUrl: "./message-item.component.html",
    styleUrls: ["./message-item.component.scss"]
})
export class MessageItemComponent implements OnInit {
    @Input("message") message: Message;
    text: string;
    date: Date;
    style: string;
    constructor() {}

    ngOnInit() {
        this.text = this.message.text;
        this.date = this.message.date;
        this.style = this.message.customStyle;
    }
}
