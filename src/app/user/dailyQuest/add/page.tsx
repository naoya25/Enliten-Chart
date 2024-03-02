"use client";

import MonthlyCalendar from "@/components/user/calenders/MonthlyCalendar";
import WeeklyCalendar from "@/components/user/calenders/WeeklyCalender";
import { UserType } from "@/type/supabaseUser";
import { supabase } from "@/utils/supabase";
import React, { useEffect, useState } from "react";

const AddDailyQuest = () => {
  const [calendarType, setCalendarType] = useState<string>("Weekly");
  const [quests, setQuests] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<UserType>({
    id: "",
    email: "",
  });

  // user取得
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

  // dailyQuest 全て取得
  useEffect(() => {
    const fetchQuests = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/dailyQuests/`,
        {
          cache: "no-store", // SSR
        }
      );
      const data = await res.json();
      console.log(data);
      setQuests(data.dailyQuests);
    };

    fetchQuests();
  }, []);

  return (
    <div>
      <button
        className="m-5"
        onClick={() =>
          setCalendarType(calendarType === "Monthly" ? "Weekly" : "Monthly")
        }
      >
        change to {calendarType === "Monthly" ? "Weekly" : "Monthly"}
      </button>
      {calendarType === "Monthly" ? (
        <MonthlyCalendar quests={quests} currentUser={currentUser} />
      ) : (
        <WeeklyCalendar quests={quests} currentUser={currentUser} />
      )}
    </div>
  );
};

export default AddDailyQuest;
