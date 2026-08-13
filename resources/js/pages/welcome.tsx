import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login, register } from '@/routes';
import { Button } from '@/components/ui/button';

export default function Welcome() {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Welcome to Broadcast React" />
            <div className="flex min-h-screen flex-col bg-background text-foreground">
                <header className="flex w-full items-center justify-between p-6 lg:px-8">
                    <div className="font-heading text-xl font-bold tracking-tight text-primary">
                        Broadcast
                    </div>
                    <nav className="flex items-center gap-4">
                        {auth.user ? (
                            <Button asChild variant="outline">
                                <Link href={dashboard()}>Dashboard</Link>
                            </Button>
                        ) : (
                            <>
                                <Button asChild variant="ghost">
                                    <Link href={login()}>Log in</Link>
                                </Button>
                                <Button asChild>
                                    <Link href={register()}>Get Started</Link>
                                </Button>
                            </>
                        )}
                    </nav>
                </header>

                <main className="flex flex-1 flex-col items-center justify-center px-6 text-center lg:px-8">
                    <h1 className="font-heading max-w-3xl text-5xl font-bold tracking-tight text-balance sm:text-7xl">
                        Real-time chat without the delay.
                    </h1>
                    <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground text-balance">
                        Connect with your team instantly. A clean, minimal communication platform built for focus and speed.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-6">
                        {auth.user ? (
                            <Button asChild size="lg" className="px-8">
                                <Link href={dashboard()}>Go to Dashboard</Link>
                            </Button>
                        ) : (
                            <>
                                <Button asChild size="lg" className="px-8 text-primary-foreground">
                                    <Link href={register()}>Start Chatting Free</Link>
                                </Button>
                                <Button asChild variant="outline" size="lg" className="px-8">
                                    <Link href={login()}>Sign In</Link>
                                </Button>
                            </>
                        )}
                    </div>
                </main>
            </div>
        </>
    );
}
