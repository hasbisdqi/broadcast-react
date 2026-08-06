export function formatDate(
    date: Date | string,
    options?: Intl.DateTimeFormatOptions,
    locale = 'id-ID',
): string {
    return new Intl.DateTimeFormat(locale, options).format(new Date(date));
}

export function formatTime(date: Date | string): string {
    return formatDate(date, {
        hour: '2-digit',
        minute: '2-digit',
    }, 'en-GB');
}

export function formatShortDate(date: Date | string): string {
    return formatDate(date, {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
}

export function formatDateTime(date: Date | string): string {
    return formatDate(date, {
        dateStyle: 'medium',
        timeStyle: 'short',
    });
}

export function formatRelativeDay(date: Date | string): string {
    const d = new Date(date);
    const today = new Date();

    const isToday = d.toDateString() === today.toDateString();

    if (isToday) {
        return formatTime(d);
    }

    return formatShortDate(d);
}