import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { z } from 'zod';

export async function GET() {
  const data = await prisma.paymentMethod.findMany();

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const res = await request.json();

  try {
    const data = z
      .object({
        name: z.string().min(1),
      })
      .parse(res);

    const checkPaymentMethodExists = await prisma.paymentMethod.findFirst({
      where: {
        name: data.name,
      },
    });

    if (checkPaymentMethodExists) {
      return new Response('Payment method already exists', { status: 400 });
    }

    await prisma.paymentMethod.create({
      data: {
        name: data.name,
      },
    });

    return NextResponse.json(null, { status: 201 });
  } catch (error: any) {
    return new Response(error.message, { status: 400 });
  }
}
