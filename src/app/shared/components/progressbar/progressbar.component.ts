import { Component, OnInit, Input } from "@angular/core";
import {
    trigger,
    state,
    style,
    animate,
    transition,
} from "@angular/animations";
@Component({
    selector: "app-progressbar",
    templateUrl: "./progressbar.component.html",
    styleUrls: ["./progressbar.component.css"],
    animations: [
        trigger("fill", [
            state("initial", style({ width: "0%" })),
            state(
                "filling",
                style({
                    width: "0%",
                })
            ),
            transition("initial => filling", [
                animate("{{ time }} ease-in"),
                style({ width: "100%" }),
            ]),
        ]),
    ],
})
export class ProgressbarComponent implements OnInit {
    @Input() time: string;
    @Input() animate: string;

    constructor() {}

    ngOnInit(): void {}
}
