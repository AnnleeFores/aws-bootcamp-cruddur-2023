import CrudPage from "@/components/CrudPage";
import HeaderElem from "@/components/HeaderElem";
import RightSidebar from "@/components/RightSidebar";
import { data } from "@/lib/data";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-row justify-start gap-x-2 h-full w-full ">
        <div className="bg-black h-full w-screen sm:w-[600px]">
          <div className="flex flex-col h-full w-full overflow-y-scroll no-scrollbar">
            <HeaderElem page={"Explore"} />

            <div className=" ">
              <div className="flex flex-col w-full justify-center ">
                <div className="block sm:hidden h-full w-full border-b border-neutral-800">
                  <div className="mb-10"> </div>
                </div>
                <CrudPage data={data} />
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:block flex-grow h-full overflow-y-auto no-scrollbar">
          <RightSidebar />
        </div>
      </div>

      <div className="block fixed z-50 bg-[#3D0D7B] bottom-0 left-0 right-0 lg:hidden w-full py-4">
        <div className="flex flex-row  w-full justify-around items-center text-center">
          <Link
            href="/signin"
            className="p-1  rounded-full bg-[#9500FF] w-5/12"
          >
            <div>Sign in</div>
          </Link>
          <Link
            href="/signup"
            className="p-1 rounded-full bg-white text-black  w-5/12"
          >
            <div>Sign up</div>
          </Link>
        </div>
      </div>
    </>
  );
}
