import { Component, OnInit, Input } from "@angular/core";
@Component({
    selector: "app-card",
    templateUrl: "./card.component.html",
    styleUrls: ["./card.component.scss"],
})
export class CardComponent implements OnInit {
    @Input() isFooterVisible: boolean;
    @Input() header: string;
    constructor() {}

    ngOnInit(): void {}
}
