import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/ui/Navbar";
import React, { ReactNode } from "react";

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="relative">
      <Navbar />
      <div className="flex min-h-screen">
        <Sidebar />
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6  max-md:pb-14 sm:px-14 h-[100vh] overflow-y-scroll">
          <div className="w-full">{children}</div>
        </section>
      </div>
    </main>
  );
};

export default HomeLayout;
