import { DetailItemComponent } from "@shared/components/detail-item/detail-item.component";
import { CardComponent } from "./card/card.component";
import { ModalComponent } from "./modal/modal.component";
import { ProgressbarComponent } from "./progressbar/progressbar.component";
export const components: any[] = [
    ModalComponent,
    CardComponent,
    ProgressbarComponent,
    DetailItemComponent,
];
export * from "./modal/modal.component";
export * from "./progressbar/progressbar.component";
export * from "./card/card.component";
export * from "@shared/components/detail-item/detail-item.component";
