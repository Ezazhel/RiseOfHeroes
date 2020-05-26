import { Store, select } from "@ngrx/store";
import { Component, OnInit, Input, Renderer2, ElementRef } from "@angular/core";
import { Observable } from "rxjs";
import { Hero } from "@core/models/entity";
import { AppState } from "@core/models";
import { heroSelector } from "@core/models/selector";
@Component({
    selector: "app-character-stats",
    templateUrl: "./character-stats.component.html",
    styleUrls: ["./character-stats.component.scss"],
})
export class CharacterStatsComponent implements OnInit {
    @Input() hero: Hero;

    hideOrDisplay(el: any, event: any) {
        const emitter = event.target;
        let isHidden = el.classList.contains("hidden");
        if (isHidden) {
            this.renderer.removeClass(el, "hidden");
        } else {
            this.renderer.addClass(el, "hidden");
        }

        const rClass = emitter.classList.contains("open") ? "open" : "close";
        const aClass = rClass == "open" ? "close" : "open";
        this.renderer.removeClass(emitter, rClass);
        this.renderer.addClass(emitter, aClass);
    }
    constructor(private renderer: Renderer2) {}

    ngOnInit(): void {}
}
