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

type ChatStatus = "sent" | "delivered" | "read" | "none"

interface ChatData {
    id: string
    name: string
    time: string
    message: string
    avatar?: string
    fallback?: string
    isGroup?: boolean
    isOnline?: boolean
    unreadCount?: number
    status: ChatStatus
}

const chats: ChatData[] = [
    { id: "1", name: "Jacquenetta Slowgrave", time: "10m", message: "Great! Looking forward to it. See you later!", avatar: "https://i.pravatar.cc/150?img=1", isOnline: true, status: "sent", unreadCount: 3 },
    { id: "2", name: "Nickola Peever", time: "40m", message: "Sounds perfect! I've been wanting to try that place.", avatar: "https://i.pravatar.cc/150?img=2", isOnline: true, status: "read" },
    { id: "3", name: "Design Team", time: "09:40", message: "Nickola: The new mockups are ready 🎨", isGroup: true, status: "none", unreadCount: 1 },
    { id: "4", name: "Farand Hume", time: "Yesterday", message: "How about 7 PM at the new Italian place downtown?", fallback: "FH", isOnline: true, status: "read" },
    { id: "5", name: "Ossie Peasey", time: "13d", message: "Hey Bonnie, yes, definitely! What time should we meet?", avatar: "https://i.pravatar.cc/150?img=4", isOnline: true, status: "sent" },
    { id: "1", name: "Jacquenetta Slowgrave", time: "10m", message: "Great! Looking forward to it. See you later!", avatar: "https://i.pravatar.cc/150?img=1", isOnline: true, status: "sent", unreadCount: 3 },
    { id: "2", name: "Nickola Peever", time: "40m", message: "Sounds perfect! I've been wanting to try that place.", avatar: "https://i.pravatar.cc/150?img=2", isOnline: true, status: "read" },
    { id: "3", name: "Design Team", time: "09:40", message: "Nickola: The new mockups are ready 🎨", isGroup: true, status: "none", unreadCount: 1 },
    { id: "4", name: "Farand Hume", time: "Yesterday", message: "How about 7 PM at the new Italian place downtown?", fallback: "FH", isOnline: true, status: "read" },
    { id: "5", name: "Ossie Peasey", time: "13d", message: "Hey Bonnie, yes, definitely! What time should we meet?", avatar: "https://i.pravatar.cc/150?img=4", isOnline: true, status: "sent" },
    { id: "1", name: "Jacquenetta Slowgrave", time: "10m", message: "Great! Looking forward to it. See you later!", avatar: "https://i.pravatar.cc/150?img=1", isOnline: true, status: "sent", unreadCount: 3 },
    { id: "2", name: "Nickola Peever", time: "40m", message: "Sounds perfect! I've been wanting to try that place.", avatar: "https://i.pravatar.cc/150?img=2", isOnline: true, status: "read" },
    { id: "3", name: "Design Team", time: "09:40", message: "Nickola: The new mockups are ready 🎨", isGroup: true, status: "none", unreadCount: 1 },
    { id: "4", name: "Farand Hume", time: "Yesterday", message: "How about 7 PM at the new Italian place downtown?", fallback: "FH", isOnline: true, status: "read" },
    { id: "5", name: "Ossie Peasey", time: "13d", message: "Hey Bonnie, yes, definitely! What time should we meet?", avatar: "https://i.pravatar.cc/150?img=4", isOnline: true, status: "sent" },
]

export default function ChatSidebar() {
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
                        {chats.map((chat) => (
                            <div
                                key={chat.id}
                                className="group flex cursor-pointer items-start gap-3 border-b border-transparent p-4 transition-colors hover:bg-muted/50"
                            >
                                <div className="relative shrink-0">
                                    <Avatar className="h-10 w-10 border">
                                        <AvatarImage src={chat.avatar} alt={chat.name} />
                                        <AvatarFallback className={chat.isGroup ? "bg-primary/10 text-primary" : "bg-muted"}>
                                            {chat.isGroup ? <UsersRound className="h-5 w-5" /> : (chat.fallback || chat.name.charAt(0))}
                                        </AvatarFallback>
                                    </Avatar>
                                    {chat.isOnline && (
                                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-emerald-500" />
                                    )}
                                </div>

                                <div className="flex min-w-0 flex-1 flex-col gap-1">
                                    <div className="flex items-center justify-between">
                                        <span className="truncate text-sm font-medium leading-none">
                                            {chat.name}
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                            {chat.time}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-1.5 pr-6">
                                        {chat.status === "sent" && <Check className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />}
                                        {chat.status === "delivered" && <CheckCheck className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />}
                                        {chat.status === "read" && <CheckCheck className="h-3.5 w-3.5 shrink-0 text-blue-500" />}

                                        <span className="truncate text-sm text-muted-foreground">
                                            {chat.message}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-col items-end gap-2">
                                    {chat.unreadCount ? (
                                        <Badge variant="default" className="flex h-5 w-5 items-center justify-center rounded-full p-0 text-[10px]">
                                            {chat.unreadCount}
                                        </Badge>
                                    ) : (
                                        <div className="h-5 w-5" />
                                    )}

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
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    )
}