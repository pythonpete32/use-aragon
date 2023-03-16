// hooks/usePortfolio.ts
import { useQuery } from "react-query";

interface PortfolioResponse {
  // Define the shape of your portfolio response data
}

const fetchPortfolio = async (address: string): Promise<PortfolioResponse> => {
  const response = await fetch(`/api/portfolio?address=${address}`);
  const data = await response.json();
  return data;
};

const usePortfolio = (address: string) => {
  return useQuery<PortfolioResponse, Error>(["portfolio", address], () => fetchPortfolio(address), {
    enabled: !!address,
  });
};

export default usePortfolio;
