import React, { useState } from 'react'
import { Head } from '@inertiajs/react'
import ChatSidebar from './sidebar'
import ChatRoom from './chat-room'
import { Conversation, Message } from '@/types'
import chat from '@/routes/chat'

function ChatPage({conversations, messages}: {conversations: Conversation[], messages?: Message[]}) {
    return (<>
        <Head title="Dashboard" />
        <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div className="relative h-full min-h-screen flex-1 overflow-scroll md:min-h-min">
                <div className="absolute inset-0 h-full">
                    <div className="flex h-full gap-3">
                        <ChatSidebar conversations={conversations} />
                        <ChatRoom messages={messages} />
                    </div>
                </div>
            </div>
        </div >
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