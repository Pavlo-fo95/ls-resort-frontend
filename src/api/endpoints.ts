import { api } from "./client";
import type {
  ServicesResponse,
  ContactInfo,
  SendResponse,
  ContactMessage,
  ContactSendIn,
  ContactPatchIn,
  Review,
  ReviewIn,
  ReviewsListResponse,
} from "./types";

export const endpoints = {
  // public
  getServices: () => api.get<ServicesResponse>("/api/services/"),

  getReviews: (limit = 6, onlyPublished = true) =>
    api.get<ReviewsListResponse>(
      `/api/reviews/?limit=${limit}&only_published=${onlyPublished ? "true" : "false"}`
    ),

  postReview: (payload: ReviewIn) =>
    api.post<{ ok: boolean; id: number }>("/api/reviews/", payload),

  getContactInfo: () => api.get<ContactInfo>("/api/contact/info"),

  sendContact: (payload: ContactSendIn) =>
    api.post<SendResponse>("/api/contact/send", payload),

  // admin-lite
  getContactAll: (unreadOnly = false) =>
    api.get<ContactMessage[]>(
      `/api/contact/all${unreadOnly ? "?unread_only=true" : ""}`
    ),

  patchContact: (id: number, patch: ContactPatchIn) =>
    api.patch<ContactMessage>(`/api/contact/${id}`, patch),

  // тут главное: is_featured вместо featured
  patchReview: (
    id: number,
    patch: Partial<Pick<Review, "status" | "is_featured">>
  ) => api.patch<Review>(`/api/reviews/${id}`, patch),
};
