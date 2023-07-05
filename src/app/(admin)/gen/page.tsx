import GenLink from '@/components/GenLink/GenLink'
import { FC } from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/libs/auth';

interface pageProps {
  
}

const page: FC<pageProps> = ({}) => {
  
  return <section>
    <GenLink/>
  </section>
}

export default page