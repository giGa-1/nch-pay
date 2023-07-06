
import { fetchRedis } from '@/helpers/fetchRedis';

export async function POST(req:Request) {
    try {   
        const {phone, name, mail, utms, country, site, idLead, price} = (await req.json()) as {phone:string,name:string,country:string,site:string,mail:string, utms: string, idLead:number, price:string}; 
        const tokensInfo = await fetchRedis('get', 'token:amocrm');
        if(tokensInfo != null) {
            const getLead = await fetch('https://newchapterweb3.amocrm.ru/api/v4/leads/'+idLead, {
                method:'GET',
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer "+JSON.parse(tokensInfo)['data']['access_token']
                },
            })
            const leadData = await getLead.json()
            if(leadData['_embedded']['tags'].find((e:any)=>e.name=='site_sale_done') === undefined) {
                if(country == 'UA') {
                    const response = await fetch(`https://newchapterweb3.amocrm.ru/api/v4/leads`, {
                        method:'PATCH',
                        referrerPolicy:'no-referrer',
                        headers: {
                            "Content-type": "application/json",
                            "Authorization": "Bearer "+JSON.parse(tokensInfo)['data']['access_token']
                        },
                        body: JSON.stringify([{
                            "id":idLead,
                            "price":+(price),
                            "_embedded":{
                                "tags": [...leadData['_embedded']['tags'].map((el:{id:number,name:string})=>{return {id:el.id, name:el.name}}), {
                                    id:  site == 'pay_done' ? 181669 : site == 'pay_cancel' ? 181671 : 181671,
                                    name: site,
                                }]
                            }
                        }])
                    })
                    const data = await response.json();
                    return new Response(JSON.stringify(data))
                } else {
                    const response = await fetch(`https://newchapterweb3.amocrm.ru/api/v4/leads`, {
                        method:'PATCH',
                        referrerPolicy:'no-referrer',
                        headers: {
                            "Content-type": "application/json",
                            "Authorization": "Bearer "+JSON.parse(tokensInfo)['data']['access_token']
                        },
                        body: JSON.stringify([{
                            "id":idLead,
                            "price":+(price),
                            "_embedded":{
                                "tags": [...leadData['_embedded']['tags'].map((el:{id:number,name:string})=>{return {id:el.id, name:el.name}}), {
                                    id:  site == 'pay_done' ? 181669 : site == 'pay_cancel' ? 181671 : 181671,
                                    name: site,
                                }]
                            }
                        }])
                    })
                    const data = await response.json();
                    return new Response(JSON.stringify(data))
                }
            }
        }
    
        return new Response(JSON.stringify('WAIT'), {status:200})

    } catch (err) {
        return new Response(JSON.stringify(err+''), {status:500})
    }
} 