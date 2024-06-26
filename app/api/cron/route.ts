import prisma from "@/utils/db";
import { NextResponse } from "next/server";
import { Prisma } from '@prisma/client';
import { headers } from 'next/headers'

export async function GET(request: Request) {
  // get authroized header
  console.log("executing change status start:", new Date());

  const { searchParams } = new URL(request.url)
  if (searchParams.get('auth') !== process.env.CRON_AUTH) {
    console.log("executing status change, Unauthorized: ", new Date());
    return NextResponse.json("Unauthorized", { status: 401 });
  }


  // find the pending job updatedAt greater than one month old, change all the pending job status to declined status
  const updateJobs = await prisma.job.updateMany({
    where: {
      status: 'pending',
      appliedDate: {
        lt: new Date(new Date().setMonth(new Date().getMonth() - 1))
      }
    },
    data: {
      status: 'declined'
    }
  });



  return NextResponse.json({
    msg: `change status ${updateJobs.count}`,
  });
}