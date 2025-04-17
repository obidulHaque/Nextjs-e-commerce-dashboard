import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Setuplayout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }
  const store = await prisma.store.findFirst({ where: { userId } });
  if (store) {
    redirect(`/${store.id}`);
  }

  return <div>{children}</div>;
};

export default Setuplayout;
