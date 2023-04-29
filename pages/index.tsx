import Button from '@/components/button'
import { signOut } from 'next-auth/react'
import Link from 'next/link'


export default function Home() {
  return (
    <>
      <Link href='/user/signup'>SIGN UP</Link>
      <Link href='/user/signin'>SIGN IN</Link>
      <Button disabled={false} type='button' onClick={()=>signOut()}>ВЫЙТИ</Button>
    </>
  )
}
