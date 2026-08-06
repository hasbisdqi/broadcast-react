import type { User } from './auth';

export type ConversationType = 'direct' | 'group';

export type MessageType =
    | 'text'
    | 'image'
    | 'video'
    | 'file';

export interface Conversation {
    id: string;

    type: ConversationType;

    name: string | null;
    avatar: string | null;

    direct_key: string | null;

    created_by: string | null;

    last_message_at: string | null;

    users: User[];

    last_message: Message | null;

    created_at: string;
    updated_at: string;
}

export interface Message {
    id: string;

    conversation_id: string;

    sender_id: string;

    type: MessageType;

    body: string | null;

    attachment: string | null;

    reply_to: string | null;

    sender: User;

    created_at: string;
    updated_at: string;
}