import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { z } from 'zod';

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;

  const findOnlyNotLinkedToMileage = !!params.get('onlyNotLinkedToMileage');
  const data = await prisma.fill.findMany({
    orderBy: {
      filledAt: 'desc',
    },
    where: findOnlyNotLinkedToMileage
      ? {
        mileage_id: null,
      }
      : undefined,
  });

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const res = await request.json();

  try {
    const data = z
      .object({
        totalPrice: z.coerce.number().min(0.1),
        totalLiters: z.coerce.number().min(0.1),
        filledAt: z.coerce.date(),
        paymentMethod: z.string(),
      })
      .parse(res);

    const checkExistsFill = await prisma.fill.findFirst({
      where: {
        AND: {
          totalPrice: data.totalPrice,
          totalLiters: data.totalLiters,
          filledAt: data.filledAt,
          paymentMethod_id: data.paymentMethod,
        },
      },
    });

    if (checkExistsFill) {
      return new Response('Fill already exists', { status: 400 });
    }

    await prisma.fill.create({
      data: {
        totalPrice: data.totalPrice,
        totalLiters: data.totalLiters,
        filledAt: data.filledAt,
        paymentMethod_id: data.paymentMethod,
      },
    });

    return NextResponse.json(null, { status: 201 });
  } catch (error: any) {
    return new Response(error.message, { status: 400 });
  }
}
