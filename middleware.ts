import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
    function middleware(request: NextRequest) {
        return NextResponse.rewrite(new URL("/", request.url));
    },
    {
        callbacks: {
            async authorized({ req }) {
                const session = await getToken({
                    req,
                    secret: process.env.NEXTAUTH_SECRET,
                });
                if (session) {
                    return true;
                }
                return false;
            },
        },
    }
);

export const config = { matcher: ["/"] };
