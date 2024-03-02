import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";

// 全profile取得用API
export const GET = async (req: Request, res: NextResponse) => {
  try {
    let { data: profiles, error } = await supabase.from("users").select("*");

    return NextResponse.json({ message: "Success", profiles }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};
