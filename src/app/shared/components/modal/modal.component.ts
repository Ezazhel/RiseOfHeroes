import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";

@Component({
    selector: "app-modal",
    templateUrl: "./modal.component.html",
    styleUrls: ["./modal.component.scss"],
})
export class ModalComponent implements OnInit {
    @Input() header: String;
    @Output() close = new EventEmitter<void>();
    @Input("cclass") customClass: string;
    constructor() {}

    ngOnInit(): void {}

    closeModal() {
        this.close.emit();
    }
}
