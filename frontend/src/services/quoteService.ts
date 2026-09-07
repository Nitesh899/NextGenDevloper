import api from "../api/axios";

export interface QuoteRequestPayload {
  name: string;
  email: string;
  phone_number: string;
  company_name: string;
  project_type: string;
  project_title: string;
  project_description: string;
  required_features: string;
  existing_website: string;
  budget_range: string;
  timeline: string;
  preferred_technologies: string;
  additional_notes: string;
  priority: string;
  services: QuoteServicePayload[];
}

export interface QuoteRequestResponse {
  success: boolean;
  message: string;
  quote_id?: number;
  errors?: Record<string, string[]>;
}

export interface QuoteServicePayload {
  service_name: string;
  description: string;
  estimated_quantity: number;
}

export const quoteService = {
  async submitQuote(
    payload: QuoteRequestPayload,
  ): Promise<QuoteRequestResponse> {
    const response =
      await api.post<QuoteRequestResponse>(
        "/quotes/",
        payload,
      );

    return response.data;
  },
};