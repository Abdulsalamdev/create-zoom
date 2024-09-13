"use client";
import React, { useState } from "react";
import Image from "next/image";
import { HomeCard } from "./HomeCard";
import { useRouter } from "next/navigation";
import { MeetingModal } from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/hooks/use-toast";

export const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<
    "isSchedulMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });
  const [callDetails, setCallDetails] = useState<Call>();
  const { user } = useUser();
  const client = useStreamVideoClient();
  const { toast } = useToast();
  const createMeeting = async () => {
    if (!user || !client) return;
    try {
      if (!values.dateTime) {
        toast({
          title: "Please select a date and time",
        });
        return;
      }
      const id = crypto.randomUUID();
      const call = client.call("default", id);
      if (!call) throw new Error("Failed to create call");

      const startAt = values.dateTime.toISOString();
      const description = values.description || "Instant Meeting";
      await call.getOrCreate({
        data: {
          starts_at: startAt,
          custom: {
            description,
          },
        },
      });
      // const link = values.link;
      setCallDetails(call);
      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }
      toast({
        title: "Meeting created",
      });
    } catch (err) {
      console.log(err);
      toast({
        title: "Faild to create meeting",
      });
    }
  };
  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an instant meeting"
        handleClick={() => {
          setMeetingState("isInstantMeeting");
        }}
        className="bg-orange-1  px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer"
      />
      <HomeCard
        img="/icons/add-meeting.svg"
        title="Join Meeting"
        description="via invitation link"
        handleClick={() => {
          setMeetingState("isJoiningMeeting");
        }}
        className="bg-blue-1  px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer"
      />
      <HomeCard
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
        handleClick={() => {
          setMeetingState("isSchedulMeeting");
        }}
        className="bg-purple-1  px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer"
      />
      <HomeCard
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Meeting recordings"
        handleClick={() => {
          router.push("/recordings");
        }}
        className="bg-yellow-1  px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer"
      />
      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => {
          setMeetingState(undefined);
        }}
        title="Start instant meeting"
        className="text-center"
        buttonText="Start Meetings"
        handleClick={createMeeting}
      />
    </section>
  );
};
