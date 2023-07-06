
export async function POST(req) {
    try {
        const ip = await req.json()
        
        const responseIp = await fetch(`https://ipapi.co/${ip}/json/`);
        const dataIp = await responseIp.json();
        
        return new Response(JSON.stringify(dataIp), {status:200})


    } catch (error) {
        return new Response('all fuck', {status: 500})
    }
}