"use client";

import { useSession, signOut } from "next-auth/react";

function ProfilePage() {
  const { data: session, status } = useSession();

  console.log(session, status);

  return (
    <div className="justify-center h-[calc(100vh-4rem)] flex items-center flex-col gap-y-5">
      <h1 className="font-bold text-3xl">Profile</h1>
      <pre className="bg-zinc-800 p-4">
        {JSON.stringify({
          session,
          status,
        })}
      </pre>
      <button
        onClick={() => {
          signOut();
        }}
        className="bg-zinc-500 px-4 py-2 block mb-2"
      >
        Logout
      </button>
    </div>
  );
}

export default ProfilePage;
