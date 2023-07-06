
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import { db } from "@/libs/db";

export async function POST(req:Request) {
    try {
        const body: GLink = await req.json();
    
        const datestemp = Date.now();

        // const session = await getServerSession(authOptions);
        // if(!session) return new Response(JSON.stringify('Unauthorized'), {status: 401});
        
        const infoSend = {
            ...body,
            date: datestemp+''
        }   

        await db.zadd(`links:start`,{nx:true}, {
            score: datestemp,
            member: JSON.stringify(btoa(JSON.stringify(infoSend)))
        })

        return new Response(JSON.stringify(req.url.split('://')[0]+'://'+req.url.split('://')[1].split('/')[0]+'/order/custom/'+btoa(JSON.stringify(infoSend))))

    } catch (error) {
        return new Response(JSON.stringify("Invalid reguest"), {status:500})
    }
}