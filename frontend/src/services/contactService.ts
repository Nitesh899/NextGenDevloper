import api from "../api/axios";

export interface ContactInquiryPayload {
  name: string;
  email: string;
  phone_number: string;
  subject: string;
  message: string;
  inquiry_type: string;
  priority: string;
}

export interface ContactInquiryResponse {
  success: boolean;
  message: string;
  inquiry_id?: number;
  errors?: Record<string, string[]>;
}

export const contactService = {
  async submitInquiry(
    payload: ContactInquiryPayload,
  ): Promise<ContactInquiryResponse> {
    const response = await api.post<ContactInquiryResponse>(
      "/contact/",
      payload,
    );

    return response.data;
  },
};