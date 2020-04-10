import { Component, OnInit, EventEmitter, Output } from "@angular/core";

@Component({
    selector: "app-inventory",
    templateUrl: "./inventory.component.html",
    styleUrls: ["./inventory.component.css"],
})
export class InventoryComponent implements OnInit {
    constructor() {}
    @Output() closing = new EventEmitter<void>();
    ngOnInit(): void {}
    onClose() {
        this.closing.emit();
    }
    toggle() {}
}
