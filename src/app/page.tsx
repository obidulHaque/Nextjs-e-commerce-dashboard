import { MainModal } from "@/components/UI/MainModal";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  const { userId } = await auth();
  console.log(userId);
  return (
    <>
      <div>
        <MainModal />
      </div>
    </>
  );
}
