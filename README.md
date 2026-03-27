# Next.js Todo App

使用 Next.js、Prisma 與 SQLite 實作的本機 Todo App。

## 專案特色

- 使用 Next.js App Router
- 使用 Prisma 作為 ORM
- 使用 SQLite 作為本機資料庫
- 支援新增、完成 / 取消完成、刪除 Todo
- 顯示待辦統計資訊

## 技術棧

- Next.js
- TypeScript
- Prisma
- SQLite
- Tailwind CSS

## 如何啟動專案

```bash
npm install
npx prisma migrate dev --name init
npm run dev
```

## 資料庫檢視
使用 Prisma Studio 檢視資料內容：
```bash
npx prisma studio
```

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
