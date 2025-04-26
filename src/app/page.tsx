"use client";
import { getUser, User } from "@/utilis/get-user";
import Image from "next/image";
import { useEffect, useState } from "react";
import CustomInput from "./components/CustomInput";

export default function Home() {
  const [text, setText] = useState("");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser();
      setUser(user);
    };
    fetchUser();
  }, []);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setText(event.target.value);
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div>
        {user ? <p>Username: {user.name}</p> : null}
        <CustomInput value={text} onChange={handleChange}>
          Input:
        </CustomInput>
        <p>You typed: {text ? text : "..."}</p>
      </div>
    </div>
  );
}
