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
    <form ref={formRef} action={action} className="mb-6">
      <label htmlFor="todo-input" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
        新增待辦事項
      </label>

      <div className="flex flex-col gap-3 sm:flex-row">
        <input id="todo-input" type="text" name="text" placeholder="例如：完成 Next.js 研究分享" className="flex-1 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-gray-400 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-gray-600" />
        <button type="submit" className="rounded-2xl bg-gray-900 px-5 py-3 font-medium text-white transition hover:opacity-90 dark:bg-white dark:text-gray-900">
          新增
        </button>
      </div>
    </form>
  )
}
