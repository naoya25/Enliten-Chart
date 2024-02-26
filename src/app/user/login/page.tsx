"use client";
import { useState } from "react";
import { supabase } from "@/utils/supabase";
import { useRouter } from "next/navigation";

export default function Register() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const doLogin = async () => {
    console.log("do login ...");
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new Error(error.message);
    console.log(data);
    console.log("Success Login");
    router.push("/");
  };

  return (
    <div>
      <h1>ログイン</h1>
      <div>
        <form>
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
          <button
            onClick={() => {
              doLogin();
            }}
          >
            ログイン
          </button>
        </form>
      </div>
    </div>
  );
}
