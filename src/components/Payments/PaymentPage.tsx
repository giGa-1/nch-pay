'use client'
import {useSearchParams} from 'next/navigation';
import React, { FC, useEffect, useState } from 'react';
import cl from './PaymentPage.module.css';
import { getIPLocation } from 'react-ip-location';
import {dataEncode, signatureGen} from '@/helpers/LiqPay';
import Widjet from './Widjet';

interface Props {
    infoObj: string
}

const PaymentPage: FC<Props> = ({infoObj}) => {

    const [isWaiting ,setIsWaiting] = useState<boolean>(false);

    const paymentActivate = async () => {
        
    }
    
    const [res, setRes] = useState<string>(''); 
    const [initial, setInitial] = useState('')
    const [isActiveLiq, setIsActiveLiq] = useState<boolean>(false)
    const [isResultLiq, setIsResultLiq] = useState<boolean | null>(null)
    const [isCode, setIsCode]  = useState<string>('')

    const handleSubmitRes = async (siteTag : 'site_sale_done' | 'site_sale_cancel', id: number,price:string) => {
        const response = await fetch('/api/change', {
            method:'POST',
            referrerPolicy:'no-referrer',
            body: JSON.stringify({
              site:siteTag,
              idLead: id,
              price:price
            })
          })
          const data = await response.json();
          console.log(data)
    }
    useEffect(()=>{
        setTimeout(()=>setRes('asd'), 3000)
    },[])

      useEffect(()=>{
        if(res) {
          const date = Date.now()
          Widjet(dataEncode(JSON.stringify({version: 3,public_key: 'i57199305658',action:'pay',amount:JSON.parse(atob(infoObj)).count,currency: 'USD',description:'Course New Chapter Test',order_id:date,})), signatureGen(JSON.stringify({version: 3,public_key: 'i57199305658',action:'pay',amount:JSON.parse(atob(infoObj)).count,currency: 'USD',description:'Course New Chapter Test',order_id:date,})), handleSubmitRes, +(JSON.parse(atob(infoObj)).lead.replace('https://newchapterweb3.amocrm.ru/leads/detail/','')), JSON.parse(atob(infoObj)).count)
        }
      },[res])
    return <section>
        <div  className={cl.liqBuy}>
            <div className={cl.loaderBlock}>
                <div className={[cl.loader, cl.loaderOne].join(' ')}></div>
                <div className={[cl.loader, cl.loaderTwo].join(' ')}></div>
                <div className={[cl.loader, cl.loaderThree].join(' ')}></div>
            </div>
            <div id='liqpay_checkout' className={cl.liqPayComp}>

            </div>
        </div>
    </section>
}

export default PaymentPage