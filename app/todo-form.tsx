'use client'

import { useRef } from 'react'
import { addTodo } from './actions'

export default function TodoForm() {
  const formRef = useRef<HTMLFormElement>(null)

  async function action(formData: FormData) {
    await addTodo(formData)
    formRef.current?.reset()
  }

  return (
    <form ref={formRef} action={action} className="mb-6 flex gap-2">
      <input
        type="text"
        name="text"
        placeholder="请输入待办事项"
        className="flex-1 rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
      />
      <button
        type="submit"
        className="rounded-xl bg-black px-5 py-3 text-white transition hover:opacity-90"
      >
        新增
      </button>
    </form>
  )
}