"use client";

import axios, { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

function RegisterPage() {
  const [error, setError] = useState();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    try {
      const signUpResponse = await axios.post("/api/auth/signup", data);
      console.log(signUpResponse);

      const res = await signIn("credentials", {
        email: signUpResponse.data.email,
        password: data.password,
        redirect: false,
        // callbackUrl: "/dashboard",
      });
      console.log(res);

      if (res?.ok) {
        return router.push("/dashboard");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        setError(error.response?.data.message);
      }
    }
  };

  return (
    <div className="justify-center h-[calc(100vh-4rem)] flex items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-neutral-950 px-8 py-10 w-3/12"
      >
        {error && <div className="bg-red-500 text-white p-2 mb-2">{error}</div>}
        <h1 className="text-4xl font-bold mb-7">Sign up</h1>
        <input
          type="text"
          placeholder="John Doe"
          name="fullname"
          className="bg-zinc-800 px-4 py-2 block mb-2 w-full"
        />
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
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
