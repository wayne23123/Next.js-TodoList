'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function addTodo(formData: FormData) {
  const text = formData.get('text')

  if (typeof text !== 'string' || !text.trim()) {
    return
  }

  await prisma.todo.create({
    data: {
      text: text.trim(),
    },
  })

  revalidatePath('/')
}

export async function toggleTodo(formData: FormData) {
  const id = Number(formData.get('id'))
  const completed = formData.get('completed') === 'true'

  if (!id) {
    return
  }

  await prisma.todo.update({
    where: { id },
    data: {
      completed: !completed,
    },
  })

  revalidatePath('/')
}

export async function deleteTodo(formData: FormData) {
  const id = Number(formData.get('id'))

  if (!id) {
    return
  }

  await prisma.todo.delete({
    where: { id },
  })

  revalidatePath('/')
}
