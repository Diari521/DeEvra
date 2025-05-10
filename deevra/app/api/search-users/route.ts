import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') || '';

  if (!q.trim()) {
    return NextResponse.json([]);
  }

  const users = await prisma.user.findMany({
    where: {
      username: {
        contains: q,
        mode: 'insensitive',
      },
    },
    select: {
      id: true,
      username: true,
    },
    take: 10,
  });

  return NextResponse.json(users);
}
