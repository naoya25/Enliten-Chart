"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import { useRouter } from "next/navigation";

const Header = () => {
  const [currentUser, setcurrentUser] = useState<string | null>("");
  const router = useRouter();

  useEffect(() => {
    const getCurrentUser = async () => {
      const { data } = await supabase.auth.getSession();

      if (data.session !== null) {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        setcurrentUser(user && user.email ? user.email : null);
      }
    };
  }, []);

  const doLogout = async () => {
    // supabaseに用意されているログアウトの関数
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
    // ログアウトを反映させるためにリロードさせる
    router.push("/login");
  };

  return (
    <div className="border-b-2 border-gray-300 flex justify-between items-center">
      {currentUser ? (
        <div suppressHydrationWarning={true}>
          <div style={{ paddingBottom: "1rem" }}>
            {currentUser} でログインしています。
          </div>
          <div>
            <button
              onClick={() => {
                doLogout();
              }}
            >
              ログアウト
            </button>
          </div>
        </div>
      ) : (
        <div suppressHydrationWarning={true}>ログインしていません。</div>
      )}
      <div className="flex">
        <a href="/" className="m-3">
          Top
        </a>
        <a href="/objective/add" className="m-3">
          Post
        </a>
        <a href="/user/register" className="m-3">
          Sign Up
        </a>
        <a href="/user/login" className="m-3">
          Login
        </a>
      </div>
    </div>
  );
};

export default Header;
