import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { MESSAGE } from "@core/constant/constant";
@Component({
    selector: "app-message-button-menu",
    templateUrl: "./message-button-menu.component.html",
    styleUrls: ["./message-button-menu.component.scss"]
})
export class MessageButtonMenuComponent implements OnInit {
    MESSAGE;
    @Output() filter = new EventEmitter<String>();
    constructor() {}

    ngOnInit(): void {
        this.MESSAGE = MESSAGE;
    }
    onFilter(type: String) {
        console.log("Un de mes boutons a été cliqué");
        this.filter.emit(type);
    }
}
