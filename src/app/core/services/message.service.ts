import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class MessageService {
  messages: string[] = [];

  add(message: string) {
    if (this.messages.length === 10) {
      this.clear();
    }
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
  constructor() {}
}
