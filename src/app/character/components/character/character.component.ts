import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
    selector: "app-character",
    templateUrl: "./character.component.html",
    styleUrls: ["./character.component.css"]
})
export class CharacterComponent implements OnInit {
    @Output() closing = new EventEmitter<void>();
    constructor() {}

    ngOnInit(): void {}
    showStats() {}
    onClose() {
        this.closing.emit();
    }
}
