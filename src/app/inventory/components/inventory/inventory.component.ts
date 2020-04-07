import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { ItemType } from "@core/models";

@Component({
    selector: "app-inventory",
    templateUrl: "./inventory.component.html",
    styleUrls: ["./inventory.component.css"],
})
export class InventoryComponent implements OnInit {
    constructor() {}
    filterBy: ItemType;
    @Output() closing = new EventEmitter<void>();
    ngOnInit(): void {}
    onClose() {
        this.closing.emit();
    }
    toggle() {}
    setFilterBy(type: ItemType) {
        this.filterBy = type;
    }
}
