import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";

@Component({
    selector: "app-modal",
    templateUrl: "./modal.component.html",
    styleUrls: ["./modal.component.css"]
})
export class ModalComponent implements OnInit {
    @Input() header: String;
    @Output() close = new EventEmitter<void>();
    constructor() {}

    ngOnInit(): void {}

    closeModal() {
        this.close.emit();
    }
}
