import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
    selector: "app-map",
    templateUrl: "./map.component.html",
    styleUrls: ["./map.component.scss"],
})
export class MapComponent implements OnInit {
    constructor() {}

    @Output() closing = new EventEmitter<void>();
    ngOnInit(): void {}
    onClose() {
        this.closing.emit();
    }
}
