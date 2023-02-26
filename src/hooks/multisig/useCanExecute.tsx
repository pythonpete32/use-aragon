import { useQuery } from "react-query";
import { CanExecuteParams, CanExecuteResult, UseCanExecuteOptions } from "../../types";
import { useAragonSDKContext } from "../context";

export function useCanExecute(executeParams: CanExecuteParams, options?: UseCanExecuteOptions): CanExecuteResult {
  const { client } = useAragonSDKContext();

  const result = useQuery<boolean>({
    queryKey: ["canExecute", executeParams],
    queryFn: async () => client?.methods.canExecute(executeParams),
    enabled: !!client,
    onError(err) {
      console.log({ "❌ useCanExecute()": err });
    },
    ...options,
  });

  return {
    canExecute: result.data ?? false,
    ...result,
  };
}
