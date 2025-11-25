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

    // Check total account limit (5 images per account)
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

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
      console.error('[CLIPDROP_ERROR]', error);
      return new NextResponse(error.error || 'Failed to generate image', { status: 500 });
    }

    const imageBlob = await response.blob();
    const arrayBuffer = await imageBlob.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');
    const imageUrl = `data:image/png;base64,${base64}`;

    // Log remaining credits
    const remainingCredits = response.headers.get('x-remaining-credits');
    const creditsConsumed = response.headers.get('x-credits-consumed');
    console.log(`Credits remaining: ${remainingCredits}, consumed: ${creditsConsumed}`);

    // Save to Supabase
    console.log('[SUPABASE] Saving image for user:', userId);
    
    const { data: insertData, error: dbError } = await supabase
      .from('generated_images')
      .insert({
        user_id: userId,
        prompt: prompt,
        image_url: imageUrl,
      })
      .select();

    if (dbError) {
      console.error('[SUPABASE_ERROR]', dbError);
    } else {
      console.log('[SUPABASE] Image saved successfully:', insertData);
    }

    return NextResponse.json({ url: imageUrl });
  } catch (error) {
    console.error('[GENERATE_ERROR]', error);
    const message = error instanceof Error ? error.message : 'Internal Error';
    return new NextResponse(message, { status: 500 });
  }
}
