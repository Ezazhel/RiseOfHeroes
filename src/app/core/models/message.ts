import { MESSAGE } from "@core/constant/constant";

export class Message {
    constructor(text: string, type: string) {
        this.text = text;
        this.type = type;
        this.date = new Date();

        switch (type) {
            case MESSAGE.COMBAT:
                this.customStyle = "combat";
                break;
            case MESSAGE.GENERAL:
                this.customStyle = "general";
                break;
        }
    }

    date: Date;
    text: string;
    type: string;
    customStyle: string;
}
