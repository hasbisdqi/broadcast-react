import React from 'react'
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
import { Bubble, BubbleContent } from '@/components/ui/bubble'
import { ArrowUpIcon, CheckCheck, GlobeIcon, ImageIcon, MessageCircleDashedIcon, PaperclipIcon, PlusIcon, TelescopeIcon } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Message as MessageType } from '@/types'
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'
import { isMyMessage } from '@/lib/chat'
import { formatTime } from '@/lib/date'

function ChatRoom({ messages }: { messages?: MessageType[] }) {
    const page = usePage();
    const { auth } = page.props;
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
                    {/* {(!messages || messages?.length === 0) && (
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
                    )} */}
                    <MessageScrollerProvider>
                        <MessageScroller>
                            <MessageScrollerViewport>
                                <MessageScrollerContent>
                                    {messages?.map((message) => {
                                        const isMe = isMyMessage(message, auth.user.id);

                                        return (
                                            <MessageScrollerItem
                                                key={message.id}
                                                messageId={message.id}
                                                scrollAnchor={isMe}
                                            >
                                                <Message
                                                    align={isMe ? "end" : "start"}
                                                >
                                                    <MessageAvatar>
                                                        <Avatar>
                                                            <AvatarImage
                                                                src={message.sender.avatar ?? ""}
                                                                alt={message.sender.name}
                                                            />
                                                            <AvatarFallback>
                                                                {message.sender.name.charAt(0)}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                    </MessageAvatar>

                                                    <MessageContent>
                                                        <Bubble variant={isMe ? "default" : "muted"}>
                                                            <BubbleContent>
                                                                {message.body}
                                                            </BubbleContent>
                                                        </Bubble>

                                                        <MessageFooter>
                                                            <div className="flex items-center gap-1">
                                                                <span>
                                                                    {formatTime(message.created_at)}
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
                        <InputGroup className='py-6'>
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
                            <InputGroupInput />
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
        </div>
    )
}

export default ChatRoom