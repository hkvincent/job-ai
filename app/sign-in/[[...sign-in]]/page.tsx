import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  console.log('SignInPage');
  return (
    <div className="min-h-screen flex justify-center items-center">
      <SignIn />
    </div>
  )
}
