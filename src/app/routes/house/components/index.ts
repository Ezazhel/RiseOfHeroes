import { HouseActionComponent } from "./house-action/house-action.component";
import { HouseComponent } from "./house/house.component";
import { WorkComponent } from "./house-action/work/work.component";
import { TrainingComponent } from "./house-action/train/training.component";
import { ConstructionComponent } from "./house-action/construction/construction.component";
export const components: any[] = [
    HouseComponent,
    HouseActionComponent,
    WorkComponent,
    TrainingComponent,
    ConstructionComponent,
];

export * from "./house/house.component";
export * from "./house-action/house-action.component";
