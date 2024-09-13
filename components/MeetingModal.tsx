import React, { ReactNode } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  className: string;
  buttonText: string;
  handleClick: () => void;
  image?: string;
  buttonIcon?: string;
  children?: ReactNode;
}
export const MeetingModal = ({
  isOpen,
  onClose,
  title,
  className,
  buttonText,
  handleClick,
  children,
  image,
  buttonIcon,
}: MeetingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* <DialogTitle>Are you absolutely sure?</DialogTitle> */}
      <DialogContent className="flex w-full max-w-[570px] flex-col gap-6 bg-dark-1 px-6 py-9 text-white border-none">
        <div className="flex flex-col gap-6">
          {image && (
            <div className="flex justify-center">
              <Image alt="" src={"image"} width={72} height={72} />
            </div>
          )}
          <h1 className={cn("text-3xl font-bold leading-[42px]  className")}>
            {title}
          </h1>
          {children}
          <button
            className="bg-blue-1 focus-visible:ring-0 focus-visible:ring-offset-0 border-none px-2"
            onClick={handleClick}
          >
            {buttonIcon && (
              <Image src={buttonIcon} alt="" width={13} height={13} />
            )}

            {buttonText || "ScheduleMeeting"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
