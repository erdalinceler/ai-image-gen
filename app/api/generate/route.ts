import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { prompt } = await req.json();

    if (!prompt || prompt.length === 0) {
      return new NextResponse('Prompt is required', { status: 400 });
    }

    if (prompt.length > 1000) {
      return new NextResponse('Prompt is too long', { status: 400 });
    }

    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // Check limit BEFORE calling ClipDrop API
    const { count } = await supabase
      .from('generated_images')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    if (count !== null && count >= 5) {
      return new NextResponse('Account limit reached (5 images total)', { status: 429 });
    }

    const form = new FormData();
    form.append('prompt', prompt);

    const response = await fetch('https://clipdrop-api.co/text-to-image/v1', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.CLIPDROP_API_KEY!,
      },
      body: form,
    });

    if (!response.ok) {
      const error = await response.json();
      return new NextResponse(error.error || 'Failed to generate image', { status: 500 });
    }

    const imageBlob = await response.blob();
    const arrayBuffer = await imageBlob.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');
    const imageUrl = `data:image/png;base64,${base64}`;

    const { data: success, error: dbError } = await supabase
      .rpc('insert_image_with_limit', {
        p_user_id: userId,
        p_prompt: prompt,
        p_image_url: imageUrl,
      });

    if (dbError) {
      return new NextResponse('Something went wrong', { status: 500 });
    }

    if (!success) {
      return new NextResponse('Account limit reached (5 images total)', { status: 429 });
    }

    return NextResponse.json({ url: imageUrl });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal Error';
    return new NextResponse(message, { status: 500 });
  }
}
