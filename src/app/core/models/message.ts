export class Message {
    constructor(text: String, type: String) {
        this.text = text;
        this.type = type;
    }

    date: Date;
    text: String;
    type: String;
    customStyle: string;
}
