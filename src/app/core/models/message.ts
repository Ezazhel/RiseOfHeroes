import { MESSAGE } from "@core/constant/constant";

export class Message {
    constructor(text: String, type: String) {
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
    text: String;
    type: String;
    customStyle: String;
}
