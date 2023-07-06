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

    const [isLead, setIsLead] = useState<string>('');
    const [isCount, setIsCount] = useState<string>('');
    const [isLink, setIsink] = useState<string>('');
    
    const generateLink = async () => {

        const infoObj = {
            // name: isName,
            lead: isLead,
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
        setIsLead('');setIsCount('');
    }

  return <section className={cl.section}>
    <div className={['continer', cl.cont].join(' ')}>
        <div className={cl.haedGen}>
            <h1 className={cl.title}><span>-</span>Generate Link Pay</h1>
         
            <div className={cl.lineHeader}>

            </div>
        </div>
        <div className={cl.generBlock}>
            <form className={cl.formStart} ref={formRef} onSubmit={e=>{e.preventDefault();generateLink()}} id="gen form">
                <MyInput placeholder='Lead Link' type='mail' name='link' value={isLead} onChange={e=>setIsLead(e.target.value)} classInput={cl.input}/>
                <MyInput type='number' placeholder='Count' name='count' value={isCount} onChange={e=>setIsCount(e.target.value)} classInput={cl.input}/>
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