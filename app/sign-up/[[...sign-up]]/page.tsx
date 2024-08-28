import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="w-full h-screen grid place-items-center max-w-7xl mx-auto p-4">
      <SignUp />
    </div>
  );
}
