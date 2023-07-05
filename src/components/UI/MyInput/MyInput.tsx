import React, { FC, InputHTMLAttributes } from 'react';
import cl from './MyInput.module.css';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    classInput: string,
}

const MyInput: FC<Props> = ({classInput, ...props}) => {
  return  <input className={[cl.inputName].join(' ')} {...props}/>
}

export default MyInput