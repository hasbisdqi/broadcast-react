import { Head } from '@inertiajs/react';
import { dashboard } from '@/routes';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Empty, EmptyTitle, EmptyDescription, EmptyContent, EmptyMedia } from '@/components/ui/empty';
import { MessageSquare, Users, PlusCircle } from 'lucide-react';

export default function Dashboard() {
    // In a real implementation, this would come from Inertia props
    const hasActiveChats = false;

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-hidden p-6 md:p-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="font-heading text-3xl font-bold tracking-tight">Dashboard</h1>
                        <p className="text-muted-foreground mt-1 text-base">
                            Welcome back to Broadcast React. Here's what's happening.
                        </p>
                    </div>
                    <Button size="lg" className="gap-2 bg-primary text-primary-foreground">
                        <PlusCircle className="size-5" />
                        Start New Chat
                    </Button>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <Card className="col-span-1 md:col-span-2">
                        <CardHeader>
                            <CardTitle>Recent Conversations</CardTitle>
                            <CardDescription>Jump back into your active discussions.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {hasActiveChats ? (
                                <div className="space-y-4">
                                    {/* Placeholder for actual chat list */}
                                </div>
                            ) : (
                                <Empty className="border-none py-8">
                                    <EmptyMedia variant="icon">
                                        <MessageSquare className="text-muted-foreground" />
                                    </EmptyMedia>
                                    <EmptyContent>
                                        <EmptyTitle>No active conversations</EmptyTitle>
                                        <EmptyDescription>
                                            You haven't started any chats yet. Connect with your team instantly.
                                        </EmptyDescription>
                                        <Button className="mt-4" variant="outline">
                                            Start a conversation
                                        </Button>
                                    </EmptyContent>
                                </Empty>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="col-span-1">
                        <CardHeader>
                            <CardTitle>Online Now</CardTitle>
                            <CardDescription>People currently active.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Empty className="border-none py-8">
                                <EmptyMedia variant="icon">
                                    <Users className="text-muted-foreground" />
                                </EmptyMedia>
                                <EmptyContent>
                                    <EmptyDescription>
                                        No one else is currently online.
                                    </EmptyDescription>
                                </EmptyContent>
                            </Empty>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
