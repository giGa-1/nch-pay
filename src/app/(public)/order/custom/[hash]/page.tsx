import PaymentPage from '@/components/Payments/PaymentPage'
import { FC } from 'react'

interface props {
    params: { hash: string }
}

const page: FC<props> = ({ params }) => {

  return <main>
    <PaymentPage infoObj={params.hash.split('%3D').join('=')}/>  
  </main>
}

export default page