import { prisma } from '@/lib/prisma'
import { toggleTodo, deleteTodo } from './actions'
import TodoForm from './todo-form'

export default async function Home() {
  const todos = await prisma.todo.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })

  const totalCount = todos.length
  const completedCount = todos.filter((todo) => todo.completed).length
  const pendingCount = totalCount - completedCount

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Todo App</h1>
          <p className="mt-2 text-gray-600">管理你的每日待辦事項</p>
        </div>

        <div className="mb-6 grid grid-cols-3 gap-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-gray-500">總數</p>
            <p className="mt-2 text-2xl font-bold">{totalCount}</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-gray-500">已完成</p>
            <p className="mt-2 text-2xl font-bold">{completedCount}</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-gray-500">未完成</p>
            <p className="mt-2 text-2xl font-bold">{pendingCount}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <TodoForm />

          <div>
            {todos.length === 0 ? (
              <div className="rounded-xl border border-dashed border-gray-300 px-4 py-8 text-center text-gray-500">目前還沒有待辦事項</div>
            ) : (
              <ul className="space-y-3">
                {todos.map((todo) => (
                  <li key={todo.id} className="flex items-center justify-between rounded-xl border border-gray-200 px-4 py-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="text-lg">{todo.completed ? '✅' : '⬜'}</span>
                      <span className={todo.completed ? 'truncate text-gray-400 line-through' : 'truncate text-gray-800'}>{todo.text}</span>
                    </div>

                    <div className="ml-4 flex shrink-0 gap-2">
                      <form action={toggleTodo}>
                        <input type="hidden" name="id" value={todo.id} />
                        <input type="hidden" name="completed" value={String(todo.completed)} />
                        <button type="submit" className="rounded-lg border border-gray-300 px-3 py-2 text-sm transition hover:bg-gray-100">
                          {todo.completed ? '取消完成' : '完成'}
                        </button>
                      </form>

                      <form action={deleteTodo}>
                        <input type="hidden" name="id" value={todo.id} />
                        <button type="submit" className="rounded-lg border border-gray-300 px-3 py-2 text-sm transition hover:bg-gray-100">
                          刪除
                        </button>
                      </form>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
