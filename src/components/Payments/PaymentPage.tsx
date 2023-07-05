'use client'
import {useSearchParams} from 'next/navigation';
import React, { FC, useEffect, useState } from 'react';
import cl from './PaymentPage.module.css';
import {PrimePayHelper} from '@/helpers/PrimePay';

interface Props {
    infoObj: GLink
}

const PaymentPage: FC<Props> = ({infoObj}) => {

    const [isWaiting ,setIsWaiting] = useState<boolean>(false);

    const paymentActivate = async () => {
        if(infoObj.payment === 'liqpay') {
            alert('Liqpay')
        } else if (infoObj.payment === 'primepay') {
            alert('prime')
            const newForm = new FormData();
            const date = Date.now();
            newForm.append('action', 'initPayment');
            newForm.append('project', '2405');
            newForm.append('sum', infoObj.count+'');
            newForm.append('currency', 'USD');
            newForm.append('innerID', infoObj.date+'');
            newForm.append('email', 'testestestestest758@gmail.com');
            newForm.append('sign', PrimePayHelper(`b2P4dt4CGMinitPayment2405${infoObj.count}USD${infoObj.date}testestestestest758@gmail.com`));
            newForm.append('comment', 'trade');
    
            const response = await fetch('/api/prime', {
                method: 'POST',
                referrerPolicy:'no-referrer',
                body: newForm,
            });
            const data = await response.json();
            if(data !== 'BAD') {
                setIsWaiting(true)
                localStorage.setItem('orderId', `${data}`.split('.io/')[1])
                window.open(data, "_blank");
            } 
        }
    }

    console.log(infoObj)
    return <section>
        <h1 className={cl.hiTitle}>Welcome to Payment Page</h1>
        <div className={cl.btnStart} onClick={e=>paymentActivate()}>
            Click To Continue
        </div>
    </section>
}

export default PaymentPage