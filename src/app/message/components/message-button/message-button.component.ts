import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";

@Component({
    selector: "app-message-button",
    templateUrl: "./message-button.component.html",
    styleUrls: ["./message-button.component.scss"]
})
export class MessageButtonComponent implements OnInit {
    @Input() type: String;
    @Input() text: String;
    @Input() active: boolean;
    @Output() messageType = new EventEmitter<String>();
    constructor() {}

    ngOnInit() {}

    filter() {
        this.messageType.emit(this.type);
    }
}
