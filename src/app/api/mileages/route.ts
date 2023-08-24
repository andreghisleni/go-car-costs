import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { z } from 'zod';

export async function GET() {
  const data = await prisma.mileage.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      fills: true,
    },
  });

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  try {
    const res = await request.json();

    const data = z
      .object({
        kilometers: z.coerce.number(),
        fill_ids: z.array(z.string()),
      })
      .parse(res);

    const checkAllFills = await Promise.all(
      data.fill_ids.map(async fill_id =>
        prisma.fill.findUnique({
          where: {
            id: fill_id,
          },
        }),
      ),
    );

    if (checkAllFills.length !== data.fill_ids.length) {
      return new Response('Fill not found', { status: 400 });
    }

    await prisma.mileage.create({
      data: {
        kilometers: data.kilometers,
        fills: {
          connect: data.fill_ids.map(fill_id => ({ id: fill_id })),
        },
      },
    });

    return NextResponse.json({}, { status: 201 });
  } catch (error: any) {
    return new Response(error.message, { status: 400 });
  }
}
