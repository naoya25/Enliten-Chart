"use client";
import { useState } from "react";
import { supabase } from "@/utils/supabase";
import { useRouter } from "next/navigation";

export default function Register() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const doRegister = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: "John",
          icon: "https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*",
        },
      },
    });
    if (error) throw new Error(error.message);
    console.log(data);
    router.push("/");
  };

  return (
    <div>
      <h1>新規登録</h1>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            doRegister();
          }}
        >
          <div>
            <label>メールアドレス：</label>
            <input
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>パスワード：</label>
            <input
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">登録</button>
        </form>
      </div>
    </div>
  );
}
