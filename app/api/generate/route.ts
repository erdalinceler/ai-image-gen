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

    return NextResponse.json({ url: imageUrl });
  } catch (error) {
    console.error('[GENERATE_ERROR]', error);
    const message = error instanceof Error ? error.message : 'Internal Error';
    return new NextResponse(message, { status: 500 });
  }
}
