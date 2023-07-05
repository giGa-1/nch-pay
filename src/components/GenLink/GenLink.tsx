'use client'
import React, { useRef, useState } from 'react';
import cl from './GenLink.module.css';
import { signOut } from 'next-auth/react'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import MyInput from '../UI/MyInput/MyInput';
import MySelect from '../UI/MySelect/MySelect';
interface Props {}

const GenLink = () => {

    const formRef = React.useRef() as React.MutableRefObject<HTMLFormElement>;

    const [isMail, setIsMail] = useState<string>('');
    const [isPhone, setIsPhone] = useState<string>('');
    // const [isName, setIsName] = useState<string>('');
    
    const [isCount, setIsCount] = useState<string>('');

    type Select = {id:number,value:string,active:boolean}[];
    const [isSelect, setIsSelect] = useState<Select>([
        {id:1, value: 'liqpay', active: true},
        {id:2, value: 'primepay', active: false},
    ]);

    const [isLink, setIsink] = useState<string>('');
    
    const logOutHandle = () => {
        try {
            signOut()
        } catch (error) {
            
        }
    }

    const generateLink = async () => {

        const infoObj = {
            // name: isName,
            phone: isPhone,
            email: isMail,
            payment: isSelect.find(e=>e.active)?.value,
            count: isCount+'',
        } as GLink

        const response = await fetch('/api/add',{
            method: 'POST',
            referrerPolicy:'no-referrer',
            body: JSON.stringify(infoObj),
        });
        const data = await response.json();
        if (data) {
            setIsink(data)
        } else {
            alert('Somthing went wrong!')
        }
        //    clear
        setIsMail('');setIsPhone('');setIsSelect(prev=>prev.map(e=>e.id === 1 ? {...e, active:true} : {...e, active:false}));
    }


    


  return <section className={cl.section}>
    <div className={['continer', cl.cont].join(' ')}>
        <div className={cl.haedGen}>
            <h1 className={cl.title}><span>-</span>Generate Link Pay</h1>
            <button className={cl.btnLogOut} onClick={e=>{e.preventDefault();logOutHandle()}}>
                LogOut
            </button>
            <div className={cl.lineHeader}>

            </div>
        </div>
        <div className={cl.generBlock}>
            <form className={cl.formStart} ref={formRef} onSubmit={e=>{e.preventDefault();generateLink()}} id="gen form">
                {/* <input type="text" name="Name" required placeholder='Name' value={isName} onChange={e=>setIsName(e.target.value)}/> */}
                <MyInput placeholder='E-mail' type='mail' name='mail' value={isMail} onChange={e=>setIsMail(e.target.value)} classInput={cl.input}/>
                <MyInput type='tel' placeholder='Phone' name='phone' value={isPhone} onChange={e=>setIsPhone(e.target.value)} classInput={cl.input}/>
                <MyInput type='number' placeholder='Count' name='phone' value={isCount} onChange={e=>setIsCount(e.target.value)} classInput={cl.input}/>
                <MySelect classSelect={cl.select} dataVariables={isSelect} setDataVariables={setIsSelect}/>
                <button type='submit' className={cl.genBtn}>Generate</button>
            </form>
        </div>
        <div className={cl.copyBlock}>
            {
                isLink.length > 2 ? 
                    <CopyToClipboard text={isLink} onCopy={e=>alert('Copied')}>
                        <span>Click To Copy</span>
                    </CopyToClipboard>
                : <div></div>
            }
        </div>
    </div>
  </section>
}

export default GenLink