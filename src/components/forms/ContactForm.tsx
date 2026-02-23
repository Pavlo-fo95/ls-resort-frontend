import { useState } from "react";
import { api } from "../../api/client";
import type { ContactSendIn, SendResponse } from "../../api/types";
import CallButton from "../ui/CallButton";
import { phones, viberLinks } from "../../config/contacts";

const initialForm: ContactSendIn = {
  name: "",
  phone: "",
  email: "",
  topic: "",
  message: "",
  preferred_contact: "viber",
};

export default function ContactForm() {
  const [form, setForm] = useState<ContactSendIn>(initialForm);
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [note, setNote] = useState<string>("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setNote("");

    try {
      const res = await api.post<SendResponse>("/api/contact/send", form);
      setNote(res.note);
      setStatus("ok");
      setNote(res.note);

      setForm((prev) => ({
        ...prev,
        message: "",
      }));
    } catch (err: unknown) {
      setStatus("error");
      setNote(err instanceof Error ? err.message : "Unknown error");
    }
  };

  return (
    <form onSubmit={onSubmit} className="contactForm">
      <input name="name" value={form.name} onChange={onChange} placeholder="Ім’я / Name" />
      <input name="phone" value={form.phone} onChange={onChange} placeholder="Телефон / Phone" />
      <input
        name="email"
        value={form.email ?? ""}
        onChange={onChange}
        placeholder="Email (optional)"
      />
      <input
        name="topic"
        value={form.topic ?? ""}
        onChange={onChange}
        placeholder="Тема (optional)"
      />
      <textarea
        name="message"
        value={form.message}
        onChange={onChange}
        placeholder="Повідомлення / Message"
        rows={5}
      />
      <div className="contactForm__quick">
        <a className="btn btn--ghost" href={viberLinks.group} target="_blank" rel="noreferrer">
          Viber
        </a>
        <CallButton phone={phones.iryna} className="btn btn--ghost" label="Call" />
      </div>
      <button className="btn btn--primary" type="submit" disabled={status === "loading"}>
        {status === "loading" ? "..." : "Надіслати"}
      </button>

      {note && <p className={status === "error" ? "textError" : "textOk"}>{note}</p>}
    </form>
  );
}
