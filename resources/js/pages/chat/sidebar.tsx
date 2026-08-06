import * as React from "react"
import {
    Plus,
    Search,
    Check,
    CheckCheck,
    UsersRound,
    MoreHorizontal,
    BellOff,
    Trash2,
    CheckCircle2
} from "lucide-react"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Conversation } from "@/types"
import { getOtherUser, isMyMessage } from "@/lib/chat"
import { Link, usePage } from "@inertiajs/react"
import chat from "@/routes/chat"
import { cn } from "@/lib/utils"


export default function ChatSidebar({ conversations }: { conversations: Conversation[] }) {
    const page = usePage();
    const { auth } = page.props;
    const activeConversationId = page.url.split("/").pop();
    return (
        <Card className="flex h-full gap-0 w-full flex-col overflow-hidden lg:w-90">
            <CardHeader className="border-b p-4">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-semibold tracking-tight">Chats</CardTitle>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                        <Plus className="h-4 w-4" />
                        <span className="sr-only">New message</span>
                    </Button>
                </div>
                <CardDescription className="mt-3">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search chats..."
                            className="h-9 w-full bg-muted/50 pl-9 focus-visible:ring-1"
                        />
                    </div>
                </CardDescription>
            </CardHeader>

            <CardContent className="flex-1 h-full p-0">
                <ScrollArea className="h-full w-full">
                    <div className="flex flex-col">
                        {conversations.length === 0 && (
                            <div className="flex h-full flex-1 items-center justify-center p-4">
                                <p className="text-sm text-muted-foreground">
                                    No conversations yet. Start a new chat!
                                </p>
                            </div>
                        )}
                        {conversations.map((conversation) => {
                            const otherUser = getOtherUser(conversation, auth.user.id);

                            const name =
                                conversation.type === 'group'
                                    ? conversation.name
                                    : otherUser?.name;

                            const avatar =
                                conversation.type === 'group'
                                    ? conversation.avatar
                                    : otherUser?.avatar;
                            return (
                                <Link
                                    href={chat.view(conversation.id)}
                                    key={conversation.id}
                                    className={cn(conversation.id === activeConversationId ? "bg-muted" : "", "group flex cursor-pointer items-start gap-3 border-b border-transparent p-4 transition-colors hover:bg-muted/50")}
                                >
                                    <div className="relative shrink-0">
                                        <Avatar className="h-10 w-10 border">
                                            <AvatarImage src={avatar || ''} alt={name || ''} />
                                            <AvatarFallback className={conversation.type === 'group' ? "bg-primary/10 text-primary" : "bg-muted"}>
                                                {conversation.type === 'group' ? <UsersRound className="h-5 w-5" /> : (name?.charAt(0))}
                                            </AvatarFallback>
                                        </Avatar>
                                        {/* {conversation.isOnline && (
                                            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-emerald-500" />
                                        )} */}
                                    </div>

                                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                                        <div className="flex items-center justify-between">
                                            <span className="truncate text-sm font-medium leading-none">
                                                {name}
                                            </span>
                                            <span className="text-xs text-muted-foreground">
                                                {conversation.last_message_at}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-1.5 pr-6">
                                            {conversation.last_message && isMyMessage(conversation.last_message, auth.user.id) && (
                                                <Check className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                                            )}
                                            <span className="truncate text-sm text-muted-foreground">
                                                {conversation.last_message?.body}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-end gap-2">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                                                >
                                                    <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                                                    <span className="sr-only">More options</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-40">
                                                <DropdownMenuItem>
                                                    <CheckCircle2 className="mr-2 h-4 w-4" />
                                                    Mark as read
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <BellOff className="mr-2 h-4 w-4" />
                                                    Mute
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="text-destructive focus:text-destructive">
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Delete chat
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    )
}