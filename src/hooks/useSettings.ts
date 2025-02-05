import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../services/apiSettings";

export const useSeetings = () => {
  const {
    isPending,
    data: settings,
    error,
  } = useQuery({
    queryKey: ["seetings"],
    queryFn: getSettings,
  });

  return { isPending, settings, error };
};
