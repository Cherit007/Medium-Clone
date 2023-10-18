import { useSocket } from "@/components/provider/use-socket-provider";
import { useEffect } from "react";

type ChatSocketProps = {
  addKey: string;
  updateKey: string;
  queryKey: string;
};

export const useChatSocket = ({ queryKey }: ChatSocketProps) => {
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) return;

    socket.on(queryKey, (data: any) => {
      return data;
    });
  }, [socket, queryKey]);
};
