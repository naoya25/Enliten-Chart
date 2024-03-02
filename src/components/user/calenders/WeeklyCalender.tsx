"use client";

import React, { useState, useEffect } from "react";
import { format, addDays, subDays, startOfWeek, endOfWeek } from "date-fns";
import { ja } from "date-fns/locale";
import { UserType } from "@/type/supabaseUser";
import { QuestType } from "@/type/dailyQuest";
import Loading from "@/components/Loading";
import CalendarCell from "./CalendarCell";

const WeeklyCalendar = ({
  quests,
  currentUser,
}: {
  quests: QuestType[];
  currentUser: UserType;
}) => {
  const [calendarTitle, setCalendarTitle] = useState<string>("");
  const [calendarDates, setCalendarDates] = useState<Date[]>([]);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  // 1週間分の日付取得
  useEffect(() => {
    const generateCalendarWeeklyDates = (date: Date) => {
      const startDate = startOfWeek(date, { weekStartsOn: 1 });
      const endDate = endOfWeek(date, { weekStartsOn: 1 });
      let week: Date[] = [];

      for (
        let date = new Date(startDate);
        date < endDate;
        date = addDays(date, 1)
      ) {
        week.push(date);
      }
      if (format(startDate, "M") == format(endDate, "M")) {
        setCalendarTitle(format(currentDate, "yyyy年 M月"));
      } else {
        setCalendarTitle(
          `${format(currentDate, "yyyy年")} ${format(
            startDate,
            "M"
          )} ~ ${format(endDate, "M")}月`
        );
      }
      setCalendarDates(week);
    };
    generateCalendarWeeklyDates(currentDate);
  }, [currentDate]);

  if (calendarDates.length == 0 || !quests) return <Loading />;

  return (
    <div>
      <div className="flex items-center justify-around text-gray-500 w-[80%] mx-auto bg-gray-200">
        <p className="m-3 text-[1.5em]">{calendarTitle}</p>
        <div className="flex">
          <p className="border w-[64px] h-[48px] rounded-[4px] flex items-center justify-center m-3">
            <button onClick={() => setCurrentDate(new Date())}>今日</button>
          </p>
          <p className="m-3 text-[1.5em]">
            <button onClick={() => setCurrentDate(subDays(currentDate, 7))}>
              {"<"}
            </button>
          </p>
          <p className="m-3 text-[1.5em]">
            <button onClick={() => setCurrentDate(addDays(currentDate, 7))}>
              {">"}
            </button>
          </p>
        </div>
      </div>

      <table className="w-[80%] mx-auto mt-[30px]">
        <thead>
          <tr>
            {calendarDates.map((date, index) => (
              <th key={index}>
                <p className="text-gray-500 text-[0.8em]">
                  {format(date, "EEE", { locale: ja })}
                </p>
                <p
                  className="h-[50px] w-[50px] rounded-[25px] mx-auto flex items-center justify-center"
                  style={{
                    backgroundColor:
                      date.toDateString() === new Date().toDateString()
                        ? "#1A73E8"
                        : "transparent",
                    color:
                      date.toDateString() === new Date().toDateString()
                        ? "white"
                        : "#6B7280",
                  }}
                >
                  {format(date, "d", { locale: ja })}
                </p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {calendarDates.map((date, index) => (
              <td
                key={index}
                className="w-[10%] h-[300px] p-[10px] border align-top"
              >
                <CalendarCell
                  quests={quests}
                  currentUser={currentUser}
                  date={date}
                />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default WeeklyCalendar;
