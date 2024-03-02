"use client";
import { useState } from "react";
import { supabase } from "@/utils/supabase";
import { useRouter } from "next/navigation";

export default function Register() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const doLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("do login ...");
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new Error(error.message);
    console.log(data);
    console.log(error);
    router.push("/");
    router.refresh()
  };

  return (
    <div>
      <h1>ログイン</h1>
      <div>
        <form onSubmit={doLogin}>
          <div>
            <label htmlFor="email">メールアドレス：</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">パスワード：</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button>ログイン</button>
        </form>
      </div>
    </div>
  );
}
