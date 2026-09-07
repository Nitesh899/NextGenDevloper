import api from "../api/axios";
import type { PortfolioData } from "../types/portfolio";

interface PortfolioApiResponse {
  success: boolean;
  message: string;
  data: PortfolioData;
}

export const portfolioService = {
  async getPortfolio(): Promise<PortfolioData> {
    const response =
      await api.get<PortfolioApiResponse>("/portfolio/");

    return response.data.data;
  },
};