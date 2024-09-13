"use server";

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

const apiSecret = process.env.STREAM_SECRET_KEY;
const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

export const tokenProvider = async () => {
  const user = await currentUser();
  if (!user) throw new Error("User is not Logged in");
  if (!apiKey) throw new Error("No Api key");
  if (!apiSecret) throw new Error("No Api secret ");

  const client = new StreamClient(apiKey, apiSecret);

  const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;
  const issued = Math.floor(Date.now() / 1000) - 60;
  const token = client.generateUserToken({
    user_id: user.id,
    exp,
    issued,
  });
  return token;
};
