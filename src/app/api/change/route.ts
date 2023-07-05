
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import { db } from "@/libs/db";

export async function POST(req:Request) {
    try {
        const body: GLink = await req.json();
    
        const session = await getServerSession(authOptions);
        if(!session) return new Response(JSON.stringify('Unauthorized'), {status: 401});

        const infoSend  = {
            ...body
        } 
        if (body.date !== undefined) {
            await db.zrem(`links:start`, {
                score: +(body.date),
            },)
        } else {
            return new Response(JSON.stringify('BAD'), {status:400})
        }

        return new Response(JSON.stringify('OK'))
    } catch (error) {
        return new Response(JSON.stringify("Invalid reguest"), {status:500})
    }
}