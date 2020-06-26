export type NotificationType =
    | "text"
    | "unlock"
    | "levelUp"
    | "selled"
    | "bougth"
    | "reward"
    | "need"
    | "noReward"
    | "inventoryFull"
    | "cantCraft"
    | "heal";

export class Notification {
    constructor(
        public param: string,
        public type: NotificationType = "text",
        public qty?: number,
        public icon?: string
    ) {}
}
export class Notifier {
    public notifications: Notification[] = [];

    public destroy(notification: Notification) {
        this.notifications.splice(this.notifications.indexOf(notification), 1);
    }

    public add(notification: Notification) {
        this.notifications.unshift(notification);
    }
}
