import { UserType } from "@/type/supabaseUser";
import { supabase } from "@/utils/supabase";
import React, { useEffect, useState } from "react";

// Userマイページ
const UserMyPage = ({ params }: { params: { id: string } }) => {
  const [user, setUser] = useState<UserType>({
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
        setUser({
          id: user?.id || "",
          email: user?.email || "",
        });
      }
    };
    getCurrentUser();
  }, []);
  return <div>page</div>;
};

export default UserMyPage;
