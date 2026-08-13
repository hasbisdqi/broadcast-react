import React, { useState } from 'react'
import { Head } from '@inertiajs/react'
import ChatSidebar from './sidebar'
import ChatRoom from './chat-room'
import { Conversation, Message } from '@/types'
import chat from '@/routes/chat'
import { BottomNav } from '@/components/ui/bottom-nav'

function ChatPage({conversations, messages}: {conversations: Conversation[], messages?: Message[]}) {
    const isActive = messages !== undefined;

    return (<>
        <Head title="Chat" />
        <div className="flex h-[100dvh] md:h-full flex-1 flex-col md:gap-4 overflow-x-hidden md:overflow-x-auto p-0 md:p-4 pb-16 md:pb-4">
            <div className="relative h-full flex-1 overflow-hidden md:min-h-min">
                <div className="absolute inset-0 h-full">
                    <div className="flex h-full md:gap-3">
                        <ChatSidebar conversations={conversations} isActive={isActive} />
                        <ChatRoom messages={messages} isActive={isActive} />
                    </div>
                </div>
            </div>
        </div >
        <BottomNav hidden={isActive} />
    </>
    )
}

ChatPage.layout =
{
    breadcrumbs: [
        {
            title: 'Chat',
            href: chat.index(),
        }
    ]
}

export default ChatPage