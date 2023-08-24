import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
    const res = await fetch('https://jsonplaceholder.typicode.com/users', {
        headers: {
            'Content-Type': 'application/json',
        },
        next: { revalidate: 60 }, // Revalidate every 60 seconds
    })
    const data = await res.json()

    return NextResponse.json({ data });
}
