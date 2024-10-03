"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

function LoginPage() {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
      // callbackUrl: "/dashboard",
    });

    if (res?.error) {
      return setError(res.error as string);
    }

    if (res?.ok) {
      return router.push("/dashboard");
    }
  };

  return (
    <div className="justify-center h-[calc(100vh-4rem)] flex items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-neutral-950 px-8 py-10 w-3/12"
      >
        {error && <div className="bg-red-500 text-white p-2 mb-2">{error}</div>}
        <h1 className="text-4xl font-bold mb-7">Sign in</h1>
        <input
          type="text"
          placeholder="doe@gmail.com"
          name="email"
          className="bg-zinc-800 px-4 py-2 block mb-2 w-full"
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          className="bg-zinc-800 px-4 py-2 block mb-2 w-full"
        />
        <button type="submit" className="bg-indigo-500 px-4 py-2">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
