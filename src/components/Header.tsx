"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import { useRouter } from "next/navigation";
import { UserType } from "@/type/supabaseUser";

const Header = () => {
  const router = useRouter();

  const [currentUser, setCurrentUser] = useState<UserType>({
    id: "",
    email: "",
  });

  useEffect(() => {
    const getCurrentUser = async () => {
      const { data } = await supabase.auth.getSession();
      console.log(data);

      if (data.session !== null) {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        console.log(user);
        setCurrentUser({
          id: user?.id || "",
          email: user?.email || "",
        });
      }
    };
    getCurrentUser();
  }, []);

  const doLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
    router.push("/user/login");
  };

  return (
    <div className="h-[50px] border-b-2 border-gray-300 flex justify-between items-center">
      {currentUser.id != "" ? (
        <div
          suppressHydrationWarning={true}
          className="flex items-center justify-between min-w-[100vw]"
        >
          <div className="m-3">
            You are logged in with : {currentUser.email}
          </div>
          <div>
            <a href="/" className="m-3">
              Top
            </a>
            <a href="/objective" className="m-3">
              目標
            </a>
            <a href="/user/dailyQuest" className="m-3">
              日課
            </a>
            <button
              onClick={() => {
                doLogout();
              }}
              className="m-3"
            >
              ログアウト
            </button>
          </div>
        </div>
      ) : (
        <div suppressHydrationWarning={true}>
          ログインしていません。
          <a href="/user/register" className="m-3">
            Sign Up
          </a>
          <a href="/user/login" className="m-3">
            Login
          </a>
        </div>
      )}
    </div>
  );
};

export default Header;
