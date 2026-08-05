import { Chat } from '@/components/chat/chat'
import { ChatHeader, ChatHeaderAddon, ChatHeaderAvatar, ChatHeaderButton, ChatHeaderMain } from '@/components/chat/chat-header'
import { ChatMessages } from '@/components/chat/chat-messages'
import { ChatToolbar, ChatToolbarAddon, ChatToolbarAttachment, ChatToolbarAttachmentButton, ChatToolbarButton, ChatToolbarTextarea } from '@/components/chat/chat-toolbar'
import { chat } from '@/routes'
import { Head } from '@inertiajs/react'
import { MoreHorizontalIcon, PhoneIcon, SendIcon, VideoIcon } from 'lucide-react'
import React, { Fragment } from 'react'

function ChatPage() {
    return (<>
        <Head title="Dashboard" />
        <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <Chat className="h-full">
                <ChatHeader>
                    <ChatHeaderAddon>
                        <ChatHeaderAvatar
                            src="https://cdn.jsdelivr.net/gh/alohe/avatars/png/upstream_20.png"
                            alt="@annsmith"
                            fallback="AS"
                        />
                    </ChatHeaderAddon>

                    <ChatHeaderMain>
                        <div className="grid">
                            <span className="font-medium">Ann Smith</span>
                            <span className="text-xs font-medium truncate">
                                Front-end developer
                            </span>
                        </div>
                    </ChatHeaderMain>
                </ChatHeader>

                <ChatToolbar>
                    <ChatToolbarAddon>
                        <ChatToolbarAttachmentButton>

                        </ChatToolbarAttachmentButton>
                    </ChatToolbarAddon>
                    <div className="w-full min-w-0 order-1 pb-1 @2xl/chat:pb-0 @2xl/chat:flex-1 @2xl/chat:w-auto @2xl/chat:order-2">
                        <ChatToolbarTextarea
                        // value={input}
                        // onChange={(e) => setInput(e.target.value)}
                        // onSubmit={() => handleSubmit()}
                        />
                    </div>
                    <ChatToolbarAddon align="inline-end">
                        <ChatToolbarButton
                        // variant="default"
                        // disabled={!input.trim() && files.length === 0}
                        // onClick={() => handleSubmit()}
                        >
                            <SendIcon />
                        </ChatToolbarButton>
                    </ChatToolbarAddon>
                </ChatToolbar>
            </Chat>

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