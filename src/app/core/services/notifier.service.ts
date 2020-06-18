import { Injectable } from "@angular/core";
import {
    Notifier,
    Notification,
    NotificationType,
} from "../../notification/notification.model";
@Injectable({
    providedIn: "root",
})
export class NotifierService {
    public notifier = new Notifier();

    public notify(
        param: string,
        icon?: string,
        type: NotificationType = "text",
        qty?: number,
        duration: number = 10 * 1000
    ): void {
        const notification: Notification = new Notification(
            param,
            type,
            qty,
            icon
        );
        const dismissWait = () => {
            new Promise<void>((resolve) => setTimeout(resolve, duration)).then(
                () => {
                    this.notifier.destroy(notification);
                }
            );
        };
        console.log(notification);
        this.notifier.add(notification);

        dismissWait();
    }
}
