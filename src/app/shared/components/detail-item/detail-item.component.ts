import { Component, OnInit, Input } from "@angular/core";
@Component({
    selector: "detail-item",
    templateUrl: "./detail-item.component.html",
    styleUrls: ["./detail-item.component.scss"],
})
export class DetailItemComponent implements OnInit {
    @Input() item;

    constructor() {}

    ngOnInit(): void {}
}
