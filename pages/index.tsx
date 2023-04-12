import Link from 'next/link'


export default function Home() {
  return (
    <>
      <Link href='/auth/signup'>SIGN UP</Link>
      <Link href='/auth/signin'>SIGN IN</Link>
    </>
  )
}
