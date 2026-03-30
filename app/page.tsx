import { prisma } from '@/lib/prisma'
import { toggleTodo, deleteTodo } from './actions'
import TodoForm from './todo-form'
import ThemeToggle from './theme-toggle'

export default async function Home() {
  const todos = await prisma.todo.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })

  const totalCount = todos.length
  const completedCount = todos.filter((todo) => todo.completed).length
  const pendingCount = totalCount - completedCount
  const completionRate = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100)

  return (
    <main className="min-h-screen bg-gray-50 transition-colors dark:bg-gray-950">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8 flex flex-col gap-4 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div>
              <p className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">Next.js + Prisma + SQLite</p>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Todo Dashboard</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600 dark:text-gray-300">這是一個使用 Next.js App Router、Server Actions、Prisma 與 SQLite 實作的本機 Todo App，支援新增、完成切換、刪除與深色模式。</p>
            </div>

            <ThemeToggle />
          </div>
        </header>

        <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm text-gray-500 dark:text-gray-400">總待辦數</p>
            <p className="mt-3 text-3xl font-bold text-gray-900 dark:text-white">{totalCount}</p>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm text-gray-500 dark:text-gray-400">已完成</p>
            <p className="mt-3 text-3xl font-bold text-gray-900 dark:text-white">{completedCount}</p>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm text-gray-500 dark:text-gray-400">未完成</p>
            <p className="mt-3 text-3xl font-bold text-gray-900 dark:text-white">{pendingCount}</p>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm text-gray-500 dark:text-gray-400">完成率</p>
            <p className="mt-3 text-3xl font-bold text-gray-900 dark:text-white">{completionRate}%</p>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-5">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">任務清單</h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">管理今天要完成的事項，並追蹤目前進度。</p>
            </div>

            <TodoForm />

            {todos.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-gray-300 px-4 py-10 text-center dark:border-gray-700">
                <p className="text-base font-medium text-gray-700 dark:text-gray-200">還沒有待辦事項</p>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">從上方輸入框新增第一筆任務吧。</p>
              </div>
            ) : (
              <ul className="space-y-3">
                {todos.map((todo) => (
                  <li key={todo.id} className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-4 transition dark:border-gray-800 dark:bg-gray-950/60 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex min-w-0 items-start gap-3">
                      <span className="mt-0.5 text-lg">{todo.completed ? '✅' : '⬜'}</span>

                      <div className="min-w-0">
                        <p className={todo.completed ? 'truncate text-base text-gray-400 line-through dark:text-gray-500' : 'truncate text-base text-gray-800 dark:text-gray-100'}>{todo.text}</p>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">ID: {todo.id}</p>
                      </div>
                    </div>

                    <div className="flex shrink-0 gap-2">
                      <form action={toggleTodo}>
                        <input type="hidden" name="id" value={todo.id} />
                        <input type="hidden" name="completed" value={String(todo.completed)} />
                        <button type="submit" className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800">
                          {todo.completed ? '取消完成' : '完成'}
                        </button>
                      </form>

                      <form action={deleteTodo}>
                        <input type="hidden" name="id" value={todo.id} />
                        <button type="submit" className="rounded-xl border border-red-200 bg-white px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 dark:border-red-900 dark:bg-gray-900 dark:text-red-400 dark:hover:bg-red-950/40">
                          刪除
                        </button>
                      </form>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">專案資訊</h2>
              <div className="mt-4 space-y-3 text-sm text-gray-600 dark:text-gray-300">
                <p>
                  <span className="font-medium text-gray-900 dark:text-white">Framework：</span>
                  Next.js App Router
                </p>
                <p>
                  <span className="font-medium text-gray-900 dark:text-white">ORM：</span>
                  Prisma
                </p>
                <p>
                  <span className="font-medium text-gray-900 dark:text-white">Database：</span>
                  SQLite
                </p>
                <p>
                  <span className="font-medium text-gray-900 dark:text-white">UI：</span>
                  Tailwind CSS
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">使用說明</h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
                <li>• 在輸入框輸入內容後按下「新增」建立待辦事項</li>
                <li>• 按「完成」可切換任務狀態</li>
                <li>• 按「刪除」可移除資料</li>
                <li>• 右上角可切換黑暗 / 淺色模式</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">研究重點</h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
                <li>• Server Actions 直接處理資料寫入</li>
                <li>• Server Component 讀取 SQLite 資料</li>
                <li>• Client Component 處理表單互動與主題切換</li>
                <li>• PrismaClient 以 singleton pattern 管理</li>
              </ul>
            </div>
          </aside>
        </section>
      </div>
    </main>
  )
}
