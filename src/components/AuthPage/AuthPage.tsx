'use client'
import { FC } from 'react'
import cl from './AuthPage.module.css';
import {signIn} from 'next-auth/react';

interface AuthPageProps {
  
}

const AuthPage: FC<AuthPageProps> = ({}) => {


  const signInNextAuth = async ()=>{
    try {
        await signIn('google')
    } catch (error) {
    } 
}

  return <section  className={cl.section}>
    <button className={cl.signIn} onClick={e=>{e.preventDefault();signInNextAuth()}} >
      SignIn
    </button>
  </section>
}

export default AuthPage