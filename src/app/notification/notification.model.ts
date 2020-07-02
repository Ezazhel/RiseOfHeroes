import {
    ITemplateBaseEquipment,
    ITemplateBaseItem,
    Currency,
} from "@core/models/game-data/game-data.model";

export type NotificationType =
    | "text"
    | "1icon"
    | "multipleIcon"
    | "convert"
    | "damage"
    | "damageCrit"
    | "unlock"
    | "levelUp"
    | "selled"
    | "bougth"
    | "reward.earn"
    | "promote"
    | "reward.exp"
    | "need"
    | "noReward"
    | "inventoryFull"
    | "cantCraft"
    | "heal";

export class Notification {
    constructor(
        public type: NotificationType = "text",
        public subType: NotificationType,
        public text: string | number,
        public item?: ITemplateBaseItem,
        public currencies?: Currency[],
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
