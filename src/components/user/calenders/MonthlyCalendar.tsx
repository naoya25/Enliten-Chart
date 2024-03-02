"use client";

import React, { useState, useEffect } from "react";
import {
  format,
  addDays,
  subDays,
  startOfMonth,
  endOfMonth,
  addMonths,
  subMonths,
  getDay,
} from "date-fns";
import CalendarCell from "./CalendarCell";
import { QuestType } from "@/type/dailyQuest";
import { UserType } from "@/type/supabaseUser";
import Loading from "@/components/Loading";
import { ja } from "date-fns/locale";

// propsで全てのdaily quest受け取って表示する
const MonthlyCalendar = ({
  quests,
  currentUser,
}: {
  quests: QuestType[];
  currentUser: UserType;
}) => {
  const [calendarDates, setCalendarDates] = useState<Date[][]>([]);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  // カレンダーの日付取得
  useEffect(() => {
    const generateCalendarDates = (month: Date) => {
      let startDate = startOfMonth(month);
      startDate = subDays(startDate, (getDay(startDate) + 6) % 7);
      const endDate = endOfMonth(month);
      const dates: Date[][] = [];
      let week: Date[] = [];

      for (
        let date = new Date(startDate);
        date <= endDate;
        date = addDays(date, 1)
      ) {
        week.push(date);

        if (week.length === 7) {
          dates.push([...week]);
          week = [];
        }
      }

      if (week.length > 0) {
        while (week.length < 7) {
          week.push(addDays(week[week.length - 1], 1));
        }
        dates.push([...week]);
      }
      console.log("calendar dates");
      console.log(dates);
      setCalendarDates(dates);
    };
    generateCalendarDates(currentMonth);
  }, [currentMonth]);

  // 背景色
  const getBackgroundColor = (date: Date, currentMonth: Date): string => {
    if (addDays(date, 1) < new Date()) {
      return "rgba(211, 211, 211, 0.7)";
    } else if (date.getDay() == 0 || date.getDay() === 6) {
      return "rgba(135, 206, 235, 0.5)";
    } else {
      return "transparent";
    }
  };

  if (calendarDates.length == 0 || !quests) return <Loading />;

  return (
    <div>
      {/* ナビゲーション部分 */}
      <div className="flex items-center justify-around text-gray-500 w-[80%] mx-auto bg-gray-200">
        <p className="m-3 text-[1.5em]">{format(currentMonth, "yyyy年 M月")}</p>
        <div className="flex">
          <p className="border w-[64px] h-[48px] rounded-[4px] flex items-center justify-center m-3">
            <button onClick={() => setCurrentMonth(new Date())}>今月</button>
          </p>
          <p className="m-3 text-[1.5em]">
            <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
              {"<"}
            </button>
          </p>
          <p className="m-3 text-[1.5em]">
            <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
              {">"}
            </button>
          </p>
        </div>
      </div>

      <table className="w-[80%] mx-auto">
        <tbody>
          {calendarDates.map((week, weekIndex) => (
            <tr key={weekIndex}>
              {week.map((date, index) => (
                <td
                  key={index}
                  className="w-[14%] p-[10px] border align-top"
                  style={{
                    backgroundColor: getBackgroundColor(date, currentMonth),
                    height: weekIndex == 0 ? "200px" : "150px",
                  }}
                >
                  {weekIndex == 0 && (
                    <p className="text-gray-500 text-[0.8em] text-center">
                      {format(date, "EEE", { locale: ja })}
                    </p>
                  )}
                  <p
                    className="h-[24px] w-[24px] rounded-[12px] mx-auto flex items-center justify-center text-[0.8em]"
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
                    {format(date, "d") == "1"
                      ? format(date, "M/d")
                      : format(date, "d")}
                  </p>
                  <CalendarCell
                    quests={quests}
                    currentUser={currentUser}
                    date={date}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MonthlyCalendar;
