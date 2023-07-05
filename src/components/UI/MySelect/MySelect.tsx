import { FC , HTMLAttributes, useState} from 'react'
import cl from './MySelect.module.css';

type Select = {id:number,value:string,active:boolean}[];

interface MySelectProps extends HTMLAttributes<HTMLDivElement> {
    dataVariables:Select,
    classSelect: string,
    setDataVariables: React.Dispatch<React.SetStateAction<Select>>
}

const MySelect: FC<MySelectProps> = ({dataVariables, classSelect, setDataVariables}) => {
    const [isActive, setIsActive] = useState<boolean>(false);
  return <div className={cl.selectBlock}>
    <div className={cl.selectHead} onClick={e=>setIsActive(!isActive)}>
        {dataVariables.find(e=>e.active)?.value}
        <svg width="20" height="12" viewBox="0 0 38 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 3L19 19L35 3" stroke="#181818" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    </div>
    <div className={isActive ? [cl.selectBody, cl.selectBodyA].join(' ') :cl.selectBody}>
        {dataVariables.filter(e=>!e.active).map(e=><div className={cl.itemBody} onClick={event=>{setDataVariables(prev=>prev.map(el=>e.id===el.id ? {...el, active:true} : {...el, active:false}));setIsActive(false)}} key={e.id}>
            {e.value}
        </div>)}
    </div>
  </div>
}

export default MySelect