"use client";

import { Button } from "@/components/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/dialog";
import { Field, FieldGroup } from "@/components/field";
import { Input } from "@/components/input";
import { capture, captureException, identify } from "@/lib/posthog";
import { cn } from "@/lib/utils";
import { useRouter, usePathname } from "next/navigation";
import { useState, type KeyboardEvent } from "react";

const WEBHOOK_URL = process.env.NEXT_PUBLIC_REGISTRATION_WEBHOOK_URL?.trim();

const sanitizeText = (value: string) =>
  value
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const containsSuspiciousContent = (value: string) =>
  /<\s*(script|style|iframe|object|embed|svg|img|link|meta)\b|javascript:|on\w+\s*=|[\u0000-\u001F\u007F]/i.test(
    value,
  );

const validateName = (
  value: string,
):
  | { ok: false; message: string }
  | { ok: true; sanitized: string; first_name: string; last_name: string } => {
  const sanitized = sanitizeText(value);

  if (!sanitized) {
    return { ok: false, message: "Please enter your name." };
  }

  if (containsSuspiciousContent(sanitized)) {
    return { ok: false, message: "Please use plain text in your name." };
  }

  const parts = sanitized.split(/\s+/).filter(Boolean);

  if (parts.length < 2) {
    return { ok: false, message: "Please enter your first and last name." };
  }

  return {
    ok: true,
    sanitized,
    first_name: parts[0],
    last_name: parts.slice(1).join(" "),
  };
};

const validateEmail = (
  value: string,
): { ok: false; message: string } | { ok: true; sanitized: string } => {
  const sanitized = sanitizeText(value).toLowerCase();

  if (!sanitized) {
    return { ok: false, message: "Please enter your email address." };
  }

  if (containsSuspiciousContent(sanitized)) {
    return { ok: false, message: "Please use a valid email address." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  if (!emailRegex.test(sanitized)) {
    return { ok: false, message: "Please enter a valid email address." };
  }

  return { ok: true, sanitized };
};

const validatePhone = (
  value: string,
): { ok: false; message: string } | { ok: true; sanitized: string } => {
  const sanitized = sanitizeText(value);

  if (!sanitized) {
    return { ok: true, sanitized: "" };
  }

  if (containsSuspiciousContent(sanitized)) {
    return { ok: false, message: "Please enter a valid phone number." };
  }

  const phoneRegex = /^[+()\d\s-]{4,20}$/;

  if (!phoneRegex.test(sanitized)) {
    return { ok: false, message: "Please enter a valid phone number." };
  }

  return { ok: true, sanitized };
};

const RegistrationForm = ({ primary_cta }: { primary_cta: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [name, set_name] = useState("");
  const [email, set_email] = useState("");
  const [phone, set_phone] = useState("");
  const [show_phone_input, set_show_phone_input] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleContinue = () => {
    const nameValidation = validateName(name);
    if (!nameValidation.ok) {
      capture("registration_form_validation_failed", {
        reason: "name",
        stage: "continue",
      });
      setError(nameValidation.message);
      return;
    }

    const emailValidation = validateEmail(email);
    if (!emailValidation.ok) {
      capture("registration_form_validation_failed", {
        reason: "email",
        stage: "continue",
      });
      setError(emailValidation.message);
      return;
    }

    identify(emailValidation.sanitized, {
      name: nameValidation.sanitized,
      stage: "form_started",
    });
    capture("registration_form_continue", {
      variant: "v1",
      stage: "contact_details",
    });
    setError(null);
    set_show_phone_input(true);
  };

  const handleSubmit = async () => {
    if (loading) {
      return;
    }

    const nameValidation = validateName(name);
    if (!nameValidation.ok) {
      capture("registration_form_validation_failed", {
        reason: "name",
        stage: "submit",
      });
      setError(nameValidation.message);
      return;
    }

    const emailValidation = validateEmail(email);
    if (!emailValidation.ok) {
      capture("registration_form_validation_failed", {
        reason: "email",
        stage: "submit",
      });
      setError(emailValidation.message);
      return;
    }

    const phoneValidation = validatePhone(phone);
    if (!phoneValidation.ok) {
      capture("registration_form_validation_failed", {
        reason: "phone",
        stage: "submit",
      });
      setError(phoneValidation.message);
      return;
    }

    if (!WEBHOOK_URL) {
      capture("registration_form_webhook_missing");
      setError("The registration webhook URL is not configured.");
      return;
    }

    setError(null);
    setLoading(true);

    const routeVariant = pathname?.includes("/v2") ? "v2" : "v1";

    try {
      const payload = {
        name: nameValidation.sanitized,
        first_name: nameValidation.first_name,
        last_name: nameValidation.last_name,
        email: emailValidation.sanitized,
        phone: phoneValidation.sanitized,
        source: "workshop",
      };

      const requestUrl = new URL(WEBHOOK_URL);
      Object.entries(payload).forEach(([key, value]) => {
        if (value) {
          requestUrl.searchParams.set(key, value);
        }
      });

      capture("registration_form_submit_attempt", {
        variant: routeVariant,
        has_phone: Boolean(phoneValidation.sanitized),
      });

      const response = await fetch(requestUrl.toString(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Webhook request failed");
      }

      capture("registration_form_submit_success", {
        variant: routeVariant,
        has_phone: Boolean(phoneValidation.sanitized),
      });
      identify(emailValidation.sanitized, {
        name: nameValidation.sanitized,
        email: emailValidation.sanitized,
        registered: true,
      });

      router.push(`/confirmation/${routeVariant}`);
    } catch (error) {
      captureException(error, {
        context: "registration_form_submit",
        variant: routeVariant,
      });
      setError("We could not save your seat right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (show_phone_input) {
        void handleSubmit();
      } else {
        handleContinue();
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>
          <Button
            onClick={() =>
              capture("registration_cta_clicked", { variant: "v1" })
            }
          >
            {primary_cta}
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-col justify-center items-center gap-y-2.5 py-6 px-6 w-[350px] border border-secondary/5 rounded-3xl bg-background/50 backdrop-blur-3xl">
          <div className="flex flex-col gap-y-2">
            <div className="text-[25px] leading-8">
              Lock In <span className="text-primary">Your Spot</span> for
              Wednesday <span className="text-primary">— Don't Lose</span> Your
              Seat
            </div>
            <div className="text-[20px] opacity-80">
              — registration closes when this week's session starts. Miss it,
              and you're waiting for the next one
            </div>
          </div>

          <FieldGroup
            className={cn(
              "w-full gap-y-1.5 mt-2.5",
              show_phone_input && "gap-y-3.5",
            )}
          >
            <Field className="flex flex-col gap-y-0.5">
              <div className="select-none pl-5 text-sm tracking-[-0.8px] text-secondary/60">
                name —
              </div>
              <Input
                id="fieldgroup-name"
                type="text"
                placeholder="Omid Shabab"
                value={name}
                onChange={(e) => set_name(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
                autoFocus
                autoComplete="name"
                maxLength={80}
              />
            </Field>

            <Field className="flex flex-col gap-y-0.5">
              <div className="select-none pl-5 text-sm tracking-[-0.8px] text-secondary/60">
                email address —
              </div>
              <Input
                id="fieldgroup-email"
                type="email"
                inputMode="email"
                placeholder="hey@omidshabab.com"
                value={email}
                onChange={(e) => set_email(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
                autoComplete="email"
                maxLength={120}
              />
            </Field>

            <div
              className={`
                transition-all duration-300 ease-in-out
                overflow-hidden
                ${show_phone_input ? "opacity-100 translate-y-0" : "max-h-0 opacity-0 translate-y-2"}
              `}
            >
              <Field className="flex flex-col gap-y-0.5">
                <div className="select-none pl-5 text-sm tracking-[-0.8px] text-secondary/60">
                  phone (optional) —
                </div>
                <Input
                  id="fieldgroup-phone"
                  type="tel"
                  inputMode="tel"
                  placeholder="+1 ***"
                  value={phone}
                  onChange={(e) => set_phone(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={loading}
                  autoComplete="tel"
                  maxLength={20}
                />
              </Field>
            </div>

            {error && (
              <div className="text-sm tracking-[-0.8px] text-primary pl-5 -mt-2">
                {error}
              </div>
            )}

            <Field orientation="horizontal">
              <Button
                type="submit"
                variant="primary"
                disabled={loading}
                onClick={() => {
                  if (show_phone_input) {
                    void handleSubmit();
                  } else {
                    handleContinue();
                  }
                }}
                className={cn("w-full mt-2.5", show_phone_input && "mt-5")}
              >
                {show_phone_input ? "Save My Seat — Now" : "continue —"}
              </Button>
            </Field>
          </FieldGroup>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RegistrationForm;
