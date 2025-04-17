import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

interface DashBoardInterface {
  children: React.ReactNode;
  params: Promise<{ storeId: string }>;
}

const DashBoardlayout = async ({ children, params }: DashBoardInterface) => {
  const { userId } = await auth();
  const { storeId } = await params;
  console.log(storeId);
  if (!userId) {
    redirect("/sign-in");
  }
  const store = await prisma.store.findFirst({
    where: { userId, id: storeId },
  });
  console.log(store);
  if (!store) {
    redirect("/");
  }
  return <div>{children} </div>;
};

export default DashBoardlayout;
