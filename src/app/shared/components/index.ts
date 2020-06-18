import { CardComponent } from "./card/card.component";
import { ModalComponent } from "./modal/modal.component";
import { ProgressbarComponent } from "./progressbar/progressbar.component";
import { SlotDetailComponent } from "./details/slot-detail.component";
import { DetailComponent } from "./details/detail.component";
import { CraftDetailComponent } from "./craftDetail/craft-detail.component";
export const components: any[] = [
    ModalComponent,
    CardComponent,
    ProgressbarComponent,
    SlotDetailComponent,
    DetailComponent,
    CraftDetailComponent,
];
export * from "./modal/modal.component";
export * from "./progressbar/progressbar.component";
export * from "./card/card.component";
export * from "./details/slot-detail.component";
export * from "./details/detail.component";
export * from "./craftDetail/craft-detail.component";
