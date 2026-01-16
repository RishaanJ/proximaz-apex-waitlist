import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const waitlistSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = waitlistSchema.parse(body)

    // Check if email already exists
    const existingEntry = await prisma.waitlistEntry.findUnique({
      where: { email },
    })

    if (existingEntry) {
      return NextResponse.json(
        { error: 'This email is already on the waitlist!' },
        { status: 409 }
      )
    }

    // Create new waitlist entry
    const entry = await prisma.waitlistEntry.create({
      data: { email },
    })

    return NextResponse.json(
      { 
        message: 'Successfully joined the waitlist!',
        entry 
      },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    console.error('Error creating waitlist entry:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const count = await prisma.waitlistEntry.count()
    return NextResponse.json({ count }, { status: 200 })
  } catch (error) {
    console.error('Error fetching waitlist count:', error)
    return NextResponse.json(
      { error: 'Failed to fetch waitlist count' },
      { status: 500 }
    )
  }
}
