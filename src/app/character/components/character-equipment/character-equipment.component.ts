import { Component, OnInit, Input } from "@angular/core";
import { Hero } from "@core/models/entity/entity";
import { Potion } from "@core/models/potions/potions.model";

@Component({
    selector: "app-character-equipment",
    templateUrl: "./character-equipment.component.html",
    styleUrls: ["./character-equipment.component.scss"],
})
export class CharacterEquipmentComponent implements OnInit {
    @Input() hero: Hero;
    constructor() {}

    ngOnInit(): void {}
}
