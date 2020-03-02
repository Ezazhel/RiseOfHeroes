import { MessageComponent } from "./message/message.component";
import { MessageButtonComponent } from "./message-button/message-button.component";
import { MessageItemComponent } from "./message-item/message-item.component";
import { MessageButtonMenuComponent } from "./message-button-menu/message-button-menu.component";
import { MessageChatComponent } from "./message-chat/message-chat.component";

export const components: any[] = [
    MessageComponent,
    MessageItemComponent,
    MessageButtonComponent,
    MessageButtonMenuComponent,
    MessageChatComponent
];

export * from "./message/message.component";
export * from "./message-button/message-button.component";
export * from "./message-item/message-item.component";
export * from "./message-button-menu/message-button-menu.component";
export * from "./message-chat/message-chat.component";
