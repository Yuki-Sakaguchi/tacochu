import type { ReactNode } from "react";
import Head from "next/head";

type Props = {
  children: ReactNode;
  title?: string;
};

export function Layout({ children, title }: Props) {
  const baseTitle = "tacochu";
  const displayTitle = title ? `${title} | ${baseTitle}` : baseTitle;
  return (
    <div className="mx-auto flex min-h-screen max-w-[480px] flex-col items-center justify-center">
      <Head>
        <title>{displayTitle}</title>
      </Head>
      <main className="flex w-full flex-1 flex-col border-l border-r">
        {children}
      </main>
    </div>
  );
}
