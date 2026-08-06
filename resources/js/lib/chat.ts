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