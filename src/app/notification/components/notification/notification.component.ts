import { notifyAnimation } from "./../../notification.animation";
import { Component, OnInit } from "@angular/core";
import { Notifier, Notification } from "app/notification/notification.model";
import { NotifierService } from "@core/services/notifier.service";

@Component({
    selector: "notification",
    templateUrl: "./notification.component.html",
    styleUrls: ["./notification.component.scss"],
    animations: [notifyAnimation],
})
export class NotificationComponent implements OnInit {
    get src(): Notifier {
        return this._notifierService.notifier;
    }
    trackByFn(index: number, el: Notification) {
        return index;
    }
    constructor(private _notifierService: NotifierService) {}

    ngOnInit(): void {}
}
