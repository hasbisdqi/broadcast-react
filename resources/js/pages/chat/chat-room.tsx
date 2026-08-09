import React, { useState } from 'react'
import { Form, usePage } from '@inertiajs/react'
import { Message, MessageAvatar, MessageContent, MessageFooter } from "@/components/ui/message"
import {
    MessageScroller,
    MessageScrollerButton,
    MessageScrollerContent,
    MessageScrollerItem,
    MessageScrollerProvider,
    MessageScrollerViewport,
} from "@/components/ui/message-scroller"
import { Bubble, BubbleContent, BubbleGroup } from '@/components/ui/bubble'
import { ArrowUpIcon, CheckCheck, GlobeIcon, ImageIcon, MessageCircleDashedIcon, PaperclipIcon, PlusIcon, TelescopeIcon } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupTextarea } from '@/components/ui/input-group'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Message as MessageType } from '@/types'
import { groupMessages, isMyMessage } from '@/lib/chat'
import { formatTime } from '@/lib/date'
import chat from '@/routes/chat'
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'
import axios from 'axios'
import { useEcho } from '@laravel/echo-react'
import { v4 as uuid } from "uuid";

function ChatRoom({ messages }: { messages?: MessageType[] }) {
    const page = usePage();
    const { auth } = page.props;
    const [body, setBody] = useState('');
    const [messagesState, setMessages] = useState<MessageType[]>(messages || []);

    const grouped = groupMessages(messagesState || []);

    const channel = `conversation.${page.url.split('/').pop()}`;
    useEcho(channel, "MessageSent", (e) => {
        setMessages(prev => {
            const index = prev.findIndex(
                message => message.client_id === e.message.client_id
            );

            if (index === -1) {
                return [...prev, e.message];
            }

            const copy = [...prev];
            copy[index] = {
                ...e.message,
                optimistic: false,
                failed: false,
            };

            return copy;
        });
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!body.trim()) return;

        const clientId = uuid();
        const optimisticMessage: MessageType = {
            id: `temp-${clientId}`,
            client_id: clientId,
            conversation_id: page.url.split('/').pop() ?? '',
            sender_id: auth.user.id,
            type: 'text',
            attachment: null,
            reply_to: null,
            body,

            sender: auth.user,

            created_at: new Date().toISOString(),

            optimistic: true,
        };

        setMessages(prev => [
            ...prev,
            optimisticMessage,
        ]);

        axios.post(
            chat.messages.store(page.url.split('/').pop() ?? '').url,
            {
                body,
                client_id: clientId,
            }
        ).then(() => {
            setBody("");
        }).catch(() => {
            setMessages(prev =>
                prev.map(message =>
                    message.client_id === clientId
                        ? {
                            ...message,
                            failed: true,
                        }
                        : message
                )
            );
        });
    };
    return (
        <div className="flex-1 grow h-full overflow-hidden">
            <Card className="h-full">
                <CardHeader className="flex items-center pb-2! justify-between border-b">
                    <div className="flex gap-2 items-center">
                        <Avatar>
                            <AvatarImage />
                            <AvatarFallback>
                                JD
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <CardTitle>John Doe</CardTitle>
                            <CardDescription>Online</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="h-full overflow-hidden">
                    {(!messagesState || messagesState?.length === 0) && (
                        <Empty className="h-full">
                            <EmptyHeader>
                                <EmptyMedia variant="icon">
                                    <MessageCircleDashedIcon />
                                </EmptyMedia>
                                <EmptyTitle>No Messages</EmptyTitle>
                                <EmptyDescription>
                                    You have no messages in this chat room. Start a conversation by sending a message.
                                </EmptyDescription>
                            </EmptyHeader>
                        </Empty>
                    )}
                    <MessageScrollerProvider>
                        <MessageScroller>
                            <MessageScrollerViewport>
                                <MessageScrollerContent>
                                    {grouped.map((group) => {
                                        const isMe = isMyMessage(group.messages[0], auth.user.id);

                                        return (
                                            <MessageScrollerItem key={group.messages[0].id}>
                                                <Message
                                                    align={isMe ? "end" : "start"}
                                                >
                                                    <MessageAvatar>
                                                        <Avatar>
                                                            <AvatarImage
                                                                src={group.messages[0].sender.avatar ?? ""}
                                                                alt={group.messages[0].sender.name}
                                                            />
                                                            <AvatarFallback>
                                                                {group.messages[0].sender.name.charAt(0)}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                    </MessageAvatar>

                                                    <MessageContent>
                                                        {group.messages.length === 1 ? (
                                                            <Bubble variant={isMe ? group.messages[0].failed ? "destructive" : "default" : "muted"}>
                                                                <BubbleContent>
                                                                    {group.messages[0].body}
                                                                </BubbleContent>
                                                            </Bubble>
                                                        ) : (
                                                            <BubbleGroup className='w-full'>
                                                                {group.messages.map((message) => (
                                                                    <Bubble
                                                                        key={message.id}
                                                                        variant={isMe ? group.messages[0].failed ? "destructive" : "default" : "muted"}
                                                                    >
                                                                        <BubbleContent>
                                                                            {message.body}
                                                                        </BubbleContent>
                                                                    </Bubble>
                                                                ))}
                                                            </BubbleGroup>
                                                        )}

                                                        <MessageFooter>
                                                            <div className="flex items-center gap-1">
                                                                <span>
                                                                    {formatTime(
                                                                        group.messages.at(-1)!.created_at
                                                                    )}
                                                                </span>

                                                                {isMe && (
                                                                    <CheckCheck className="size-4 text-blue-400" />
                                                                )}
                                                            </div>
                                                        </MessageFooter>
                                                    </MessageContent>
                                                </Message>
                                            </MessageScrollerItem>
                                        );
                                    })}
                                </MessageScrollerContent>
                            </MessageScrollerViewport>
                            <MessageScrollerButton />
                        </MessageScroller>
                    </MessageScrollerProvider>
                </CardContent>
                <CardFooter className='pt-3'>
                    <Form className='w-full'>
                        <InputGroup>
                            <InputGroupAddon align={'inline-start'}>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <InputGroupButton aria-label="Add files" type="button" size="icon-sm" variant="outline">
                                            <PlusIcon />
                                        </InputGroupButton>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        align="start"
                                        side="top"
                                        className="w-44"
                                    >
                                        <DropdownMenuItem>
                                            <PaperclipIcon />
                                            Add Photos & Files
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                            <ImageIcon />
                                            Create Image
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <TelescopeIcon />
                                            Deep Research
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <GlobeIcon />
                                            Web Search
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </InputGroupAddon>
                            <InputGroupTextarea
                                className="min-h-0!"
                                rows={1}
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && !e.shiftKey) {
                                        e.preventDefault();
                                        submit(e as unknown as React.FormEvent);
                                    }
                                }} />
                            <InputGroupAddon align={'inline-end'}>
                                <InputGroupButton
                                    type="submit"
                                    variant="default"
                                    size="icon-sm"
                                    className="ml-auto"
                                >
                                    <ArrowUpIcon />
                                    <span className="sr-only">Send</span>
                                </InputGroupButton>
                            </InputGroupAddon>
                        </InputGroup>
                    </Form>
                </CardFooter>
            </Card>
        </div >
    )
}

export default ChatRoom