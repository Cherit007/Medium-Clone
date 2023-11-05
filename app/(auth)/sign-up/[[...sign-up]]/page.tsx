import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex h-[100vh] justify-center items-center">
      <SignUp  afterSignUpUrl={"/register"}/>
    </div>
  );
}
