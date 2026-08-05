import React, { useState } from 'react'
import { chat } from '@/routes'
import { Form, Head } from '@inertiajs/react'
import { Message, MessageContent } from "@/components/ui/message"
import {
    MessageScroller,
    MessageScrollerButton,
    MessageScrollerContent,
    MessageScrollerItem,
    MessageScrollerProvider,
    MessageScrollerViewport,
} from "@/components/ui/message-scroller"
import { Bubble, BubbleContent } from '@/components/ui/bubble'
import ChatSidebar from './sidebar'
import { ArrowUpIcon, GlobeIcon, ImageIcon, MessagesSquare, PaperclipIcon, PlusIcon, TelescopeIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Textarea } from '@/components/ui/textarea'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText, InputGroupTextarea } from '@/components/ui/input-group'
import { IconSend } from '@tabler/icons-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

function ChatPage() {

    const [activeChatId, setActiveChatId] = useState<string | null>(null)
    let messages = [
        {
            id: '1',
            role: "user",
            content: "Hello, how are you?"
        },
        {
            id: '2',
            role: "assistant",
            content: "I'm good, thank you! How can I assist you today?"
        },
        {
            id: '3',
            role: "user",
            content: "Can you tell me a joke?"
        },
        {
            id: '4',
            role: "assistant",
            content: "Sure! Why don't scientists trust atoms? Because they make up everything!"
        },
        {
            id: '5',
            role: "user",
            content: "Haha, that's a good one! Can you tell me another joke?"
        },
        {
            id: '6',
            role: "assistant",
            content: "Of course! Why did the scarecrow win an award? Because he was outstanding in his field!"
        },
        {
            id: '7',
            role: "user",
            content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe impedit, earum minus tempora vel sunt perferendis quis distinctio repellat? Deserunt commodi sapiente omnis accusamus saepe nemo voluptatem veritatis vitae dolores aspernatur excepturi, temporibus eaque fuga non dignissimos cumque velit cupiditate totam ex id nobis! Eius minima iste animi sunt dolores? Quaerat sint harum iste asperiores soluta quia, eaque odit in numquam fuga distinctio saepe itaque suscipit porro laboriosam reprehenderit nesciunt dolore nihil ab adipisci fugit ratione necessitatibus ea quae! Nemo deleniti similique dignissimos sed, ipsum excepturi quos tenetur doloremque. Nulla at, aut error voluptate eveniet sunt dicta quo corporis possimus recusandae commodi enim vitae doloribus adipisci excepturi quisquam, quos tenetur! Veniam, architecto! Ipsa beatae ut quia dolorum obcaecati voluptatum illo neque, molestias quasi repellendus id animi, facere, quod commodi tenetur! Eius recusandae dolorum neque, nihil reiciendis enim repudiandae blanditiis rerum id ipsum nemo labore, autem debitis impedit perspiciatis, consequatur sapiente eaque! Totam harum, neque repellendus, dolore qui perspiciatis eveniet voluptatum tenetur inventore eaque vero culpa rem nulla libero incidunt veritatis adipisci commodi placeat facilis? Necessitatibus non laboriosam sint ratione in! Neque quia ea aperiam delectus? Eveniet praesentium pariatur perspiciatis! Quae accusantium ipsam modi officia quidem nobis culpa pariatur repudiandae placeat."
        },
        {
            id: '7',
            role: "user",
            content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe impedit, earum minus tempora vel sunt perferendis quis distinctio repellat? Deserunt commodi sapiente omnis accusamus saepe nemo voluptatem veritatis vitae dolores aspernatur excepturi, temporibus eaque fuga non dignissimos cumque velit cupiditate totam ex id nobis! Eius minima iste animi sunt dolores? Quaerat sint harum iste asperiores soluta quia, eaque odit in numquam fuga distinctio saepe itaque suscipit porro laboriosam reprehenderit nesciunt dolore nihil ab adipisci fugit ratione necessitatibus ea quae! Nemo deleniti similique dignissimos sed, ipsum excepturi quos tenetur doloremque. Nulla at, aut error voluptate eveniet sunt dicta quo corporis possimus recusandae commodi enim vitae doloribus adipisci excepturi quisquam, quos tenetur! Veniam, architecto! Ipsa beatae ut quia dolorum obcaecati voluptatum illo neque, molestias quasi repellendus id animi, facere, quod commodi tenetur! Eius recusandae dolorum neque, nihil reiciendis enim repudiandae blanditiis rerum id ipsum nemo labore, autem debitis impedit perspiciatis, consequatur sapiente eaque! Totam harum, neque repellendus, dolore qui perspiciatis eveniet voluptatum tenetur inventore eaque vero culpa rem nulla libero incidunt veritatis adipisci commodi placeat facilis? Necessitatibus non laboriosam sint ratione in! Neque quia ea aperiam delectus? Eveniet praesentium pariatur perspiciatis! Quae accusantium ipsam modi officia quidem nobis culpa pariatur repudiandae placeat."
        }
    ]
    return (<>
        <Head title="Dashboard" />
        <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div className="relative h-full min-h-screen flex-1 overflow-scroll md:min-h-min">
                <div className="absolute inset-0 h-full">
                    <div className="flex h-full gap-3">
                        <ChatSidebar />
                        <div className="flex-1 grow h-full overflow-hidden">
                            <Card className="h-full gap-0">
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
                                    <MessageScrollerProvider>
                                        <MessageScroller>
                                            <MessageScrollerViewport>
                                                <MessageScrollerContent>
                                                    {messages.map((message) => (
                                                        <MessageScrollerItem
                                                            key={message.id}
                                                            messageId={message.id}
                                                            scrollAnchor={message.role === "user"}
                                                        >
                                                            <Message about={message.role} align={message.role === "user" ? "end" : "start"}>
                                                                <MessageContent>
                                                                    <Bubble variant={message.role === "user" ? "default" : "muted"}>
                                                                        <BubbleContent>
                                                                            {message.content}
                                                                        </BubbleContent>
                                                                    </Bubble>
                                                                </MessageContent>
                                                            </Message>
                                                        </MessageScrollerItem>
                                                    ))}
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
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}
ChatPage.layout =
{
    breadcrumbs: [
        {
            title: 'Chat',
            href: chat(),
        }
    ]
}

export default ChatPage