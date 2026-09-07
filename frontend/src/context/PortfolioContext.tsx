import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { portfolioService } from "../services/portfolioService";

import type {
  PortfolioData,
} from "../types/portfolio";


interface PortfolioContextType {
  portfolio: PortfolioData | null;

  isLoading: boolean;

  error: string | null;

  refreshPortfolio: () => Promise<void>;
}


const PortfolioContext =
  createContext<
    PortfolioContextType | undefined
  >(undefined);


interface PortfolioProviderProps {
  children: ReactNode;
}


export function PortfolioProvider({
  children,
}: PortfolioProviderProps) {

  const [
    portfolio,
    setPortfolio,
  ] = useState<PortfolioData | null>(
    null
  );


  const [
    isLoading,
    setIsLoading,
  ] = useState(true);


  const [
    error,
    setError,
  ] = useState<string | null>(
    null
  );


  const loadPortfolio =
    async () => {

      try {

        setIsLoading(true);

        setError(null);

        const data =
          await portfolioService.getPortfolio();

        setPortfolio(data);

      } catch (error) {

        console.error(
          "Failed to load portfolio:",
          error
        );

        setError(
          "Unable to load portfolio data."
        );

      } finally {

        setIsLoading(false);

      }
    };


  useEffect(() => {

    loadPortfolio();

  }, []);


  const refreshPortfolio =
    async () => {

      await loadPortfolio();

    };


  return (
    <PortfolioContext.Provider
      value={{
        portfolio,
        isLoading,
        error,
        refreshPortfolio,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}


export function usePortfolio() {

  const context =
    useContext(
      PortfolioContext
    );


  if (!context) {

    throw new Error(
      "usePortfolio must be used inside PortfolioProvider"
    );

  }


  return context;
}