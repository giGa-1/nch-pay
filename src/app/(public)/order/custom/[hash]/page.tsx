import PaymentPage from '@/components/Payments/PaymentPage'
import { FC } from 'react'

interface props {
    params: { hash: string }
}

const page: FC<props> = ({ params }) => {

  return <main>
    <PaymentPage infoObj={JSON.parse(atob(params.hash.replace('%3D', '=')))}/>  
  </main>
}

export default page