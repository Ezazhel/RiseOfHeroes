import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { MESSAGE } from "@core/constant/constant";
@Component({
    selector: "app-message-button-menu",
    templateUrl: "./message-button-menu.component.html",
    styleUrls: ["./message-button-menu.component.scss"]
})
export class MessageButtonMenuComponent implements OnInit {
    MESSAGE;
    activeButton: String;
    @Output() filter = new EventEmitter<String>();
    constructor() {}

    ngOnInit(): void {
        this.MESSAGE = MESSAGE;
        this.activeButton = MESSAGE.ALL;
    }
    onFilter(type: String) {
        this.activeButton = type;
        this.filter.emit(type);
    }
}
