import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );


    const { data: images, error: imagesError } = await supabase
      .from("generated_images")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(4);

    if (imagesError) {
      return new NextResponse("Something went wrong", { status: 500 });
    }

 
    const { count } = await supabase
      .from("generated_images")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);

    return NextResponse.json({
      images: images || [],
      totalCount: count || 0,
    });
  } catch {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
