import prisma from "@/lib/prisma";
import React from "react";

const DashBoard = async ({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) => {
  const { storeId } = await params;
  console.log(storeId);
  const store = await prisma.store.findFirst({ where: { id: storeId } });
  return <div>{store?.name} </div>;
};

export default DashBoard;
