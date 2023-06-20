import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { CreateTodo } from "@/components/CreateTodo";
import { Todos } from "@/components/Todos";
import { Layout } from "@/components/Layout";

export default function Home() {
  const { data: sessionData, status } = useSession();
  return (
    <Layout>
      <div className="bg-olive-one selection:bg-green-two min-h-screen p-0 md:px-8 ">
        <main className="bg-cream-four md:outline-cream-four mx-auto min-h-screen max-w-none rounded-none px-5 pb-10 pt-12 outline-none md:max-w-[60rem] md:rounded-2xl md:px-8 md:outline md:outline-4 md:outline-offset-8">
          <h1 className="text-gray-three mb-6 text-center text-4xl font-bold">
            🌮 Tacochu 🌮
          </h1>
          {status !== "loading" && sessionData && (
            // status が "loading" でない、つまり認証情報の取得が完了している、
            // かつ、認証されている場合に、下記が表示されます
            <>
              <div className="flex flex-col items-center">
                <p className="text-l mb-4 text-center text-white">
                  <span>Logged in as {sessionData.user?.email}</span>
                </p>
                <button
                  className="hover:text-green-five mb-8 inline-flex cursor-pointer items-center justify-center rounded-md px-4 py-2 font-semibold outline outline-2 outline-offset-2 outline-green-700"
                  onClick={() => void signOut()}
                >
                  Sign out
                </button>

                <div className="mx-auto mt-4 flex justify-center">
                  <Image
                    src="/images/taco.jpg"
                    width={600}
                    height={600}
                    alt="タコス"
                  />
                </div>
              </div>
              <div className="mt-8">
                <CreateTodo />
                <Todos />
              </div>
            </>
          )}
          {status !== "loading" && !sessionData && (
            // status が "loading" でない、つまり認証情報の取得が完了している、
            // かつ、認証されていない場合に、下記が表示されます
            <div className="flex flex-col items-center">
              <button
                className="outline-green-one hover:text-green-five mb-5 inline-flex cursor-pointer items-center justify-center rounded-md px-4 py-2 font-semibold outline outline-2 outline-offset-2"
                onClick={() => void signIn()}
              >
                Sign In
              </button>
              <div className="mb-5 text-xl">
                <p className="text-gray-four text-center">
                  火曜日はタコス作りましょう！
                </p>
              </div>
              <div className="">
                <Image
                  src="/images/taco.jpg"
                  width={600}
                  height={600}
                  alt="タコス"
                />
              </div>
            </div>
          )}
        </main>
      </div>
    </Layout>
  );
}
