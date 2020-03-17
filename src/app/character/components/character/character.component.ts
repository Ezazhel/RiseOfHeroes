import { Component, OnInit } from "@angular/core";
import { HeroService } from "@core/services";

@Component({
    selector: "app-character",
    templateUrl: "./character.component.html",
    styleUrls: ["./character.component.css"]
})
export class CharacterComponent implements OnInit {
    display: boolean = false;
    constructor(public heroService: HeroService) {}

    ngOnInit(): void {
        this.heroService.showStats.subscribe(d => {
            this.display = d;
        });
    }
    showStats() {
        this.heroService.setshowStats();
    }
}
