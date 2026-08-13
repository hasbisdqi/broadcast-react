import * as React from "react"
import { MessageCircle, LayoutDashboard, UserCircle } from "lucide-react"
import { Link, usePage } from "@inertiajs/react"
import { cn } from "@/lib/utils"

export function BottomNav({ hidden }: { hidden?: boolean }) {
    const page = usePage();
    const currentUrl = page.url;

    if (hidden) return null;

    const navItems = [
        {
            name: "Dashboard",
            href: "/dashboard",
            icon: LayoutDashboard,
            active: currentUrl.startsWith("/dashboard"),
        },
        {
            name: "Chats",
            href: "/chat",
            icon: MessageCircle,
            active: currentUrl.startsWith("/chat"),
        },
        {
            name: "Profile",
            href: "/settings/profile",
            icon: UserCircle,
            active: currentUrl.startsWith("/settings"),
        },
    ];

    return (
        <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-background border-t md:hidden flex justify-around items-center px-4 pb-safe-bottom">
            {navItems.map((item) => (
                <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                        "flex flex-col items-center justify-center w-full h-full space-y-1 text-xs font-medium transition-colors",
                        item.active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    )}
                >
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                </Link>
            ))}
        </div>
    )
}
