
import { db } from "@/libs/db";

export async function POST(req:Request) {
    try {
        const body = await req.formData();
        console.log(body)

        const response = await fetch('https://pay.primepayments.io/API/v2/', {
            method: 'POST',
            referrerPolicy: 'no-referrer',
            body: body
        })
        const data = await response.json();
        console.log(data)
        if(data.status == 'OK') {
            return new Response(JSON.stringify(data.result))
        } else {
            return new Response(JSON.stringify('BAD'))
        }

    } catch (error) {
        return new Response(JSON.stringify("Invalid reguest"), {status:500})
    }
}