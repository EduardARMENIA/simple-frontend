import { NextResponse } from 'next/server';

export function middleware(req: any) {
    const url = req.nextUrl.clone()
    const token = req.cookies.get('token');

    if (!token) {
        if(url.pathname === '/auth/register') {
            url.pathname = '/auth/register'
            return NextResponse.rewrite(url)
        }
        url.pathname = '/auth/login'
        return NextResponse.rewrite(url)
    }

    if(token) {
        if(url.pathname === '/auth/login' || url.pathname === '/auth/register') {
            url.pathname = '/dashboard'
            return NextResponse.rewrite(url)
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard', '/auth/login', '/auth/register']
};
