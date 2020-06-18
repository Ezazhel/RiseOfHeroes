import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NotificationComponent } from "./components/notification/notification.component";
import { SharedModule } from "@shared/shared.module";

@NgModule({
    declarations: [NotificationComponent],
    imports: [CommonModule, SharedModule],
    exports: [NotificationComponent],
})
export class NotificationModule {}
