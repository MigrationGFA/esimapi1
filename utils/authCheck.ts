import { cookies } from "next/headers";

export async function isAuthenticated(): Promise<boolean> {
    const cookieStore = await cookies(); // Await the cookies() Promise
    const token = cookieStore.get('accessToken');
    return !!token;
}
