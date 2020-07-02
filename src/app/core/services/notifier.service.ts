import { Injectable } from "@angular/core";
import {
    Notifier,
    Notification,
    NotificationType,
} from "../../notification/notification.model";
import {
    ITemplateBaseItem,
    Currency,
} from "@core/models/game-data/game-data.model";
@Injectable({
    providedIn: "root",
})
export class NotifierService {
    public notifier = new Notifier();

    public notify(
        type: NotificationType = "text",
        subType: NotificationType,
        text: string | number,
        duration: number = 3 * 1000,
        item?: ITemplateBaseItem,
        currencies?: Currency[],
        icon?: string
    ): void {
        const notification: Notification = new Notification(
            type,
            subType,
            text,
            item,
            currencies,
            icon
        );
        const dismissWait = () => {
            new Promise<void>((resolve) => setTimeout(resolve, duration)).then(
                () => {
                    this.notifier.destroy(notification);
                }
            );
        };
        this.notifier.add(notification);

        dismissWait();
    }
}
