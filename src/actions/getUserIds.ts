"use server";

import { clerkClient } from "@clerk/nextjs/server";

export async function getUserIds(emails: string[]) {
  const res = await clerkClient.users.getUserList({
    emailAddress: emails,
  });

  return res.map((user) => user.id);
}
