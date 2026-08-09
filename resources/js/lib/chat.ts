import type { Conversation, Message, User } from '@/types';

export function getOtherUser(
    conversation: Conversation,
    currentUserId: string,
): User | undefined {
    if (conversation.type !== 'direct') {
        return undefined;
    }

    return conversation.users.find(
        user => user.id !== currentUserId,
    );
}

export function isMyMessage(
    message: Message,
    currentUserId: string,
): boolean {
    return message.sender_id === currentUserId;
}

export interface MessageGroup {
    sender_id: string;
    sender: Message["sender"];
    messages: Message[];
}

export function groupMessages(messages: Message[]): MessageGroup[] {
    const groups: MessageGroup[] = [];

    for (const message of messages) {
        const last = groups.at(-1);

        if (last && last.sender_id === message.sender_id) {
            last.messages.push(message);
            continue;
        }

        groups.push({
            sender_id: message.sender_id,
            sender: message.sender,
            messages: [message],
        });
    }

    return groups;
}