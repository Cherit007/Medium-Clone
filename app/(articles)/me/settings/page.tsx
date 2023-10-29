import { currentProfile } from "@/lib/current-profile";
import Settings from "@/pagesfolder/Settings/Settings";
import React from "react";

export default async function page() {
  const user = await currentProfile();
  if (user) return <Settings user={user}/>;
}
