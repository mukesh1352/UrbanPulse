"use client";

import useLiveSocket from "@/hooks/useLiveSocket";

export default function LiveSocketProvider() {
  useLiveSocket();

  return null;
}