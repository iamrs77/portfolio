/**
 * Contact form configuration and validation.
 *
 * The form posts to Formspree (https://formspree.io), a free form backend that works on
 * static hosts, validates submissions server-side and filters spam. It is only shown when
 * NEXT_PUBLIC_FORMSPREE_FORM_ID is set; the form ID is public by design and is not a secret.
 */

const formId = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID?.trim();

export const contactFormEndpoint = formId ? `https://formspree.io/f/${encodeURIComponent(formId)}` : undefined;

export const CONTACT_LIMITS = {
  name: { min: 2, max: 100 },
  message: { min: 10, max: 5000 },
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(values) {
  const errors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim();

  if (name.length < CONTACT_LIMITS.name.min) errors.name = "Please enter your name.";
  else if (name.length > CONTACT_LIMITS.name.max) errors.name = `Please keep your name under ${CONTACT_LIMITS.name.max} characters.`;

  if (!EMAIL_PATTERN.test(email)) errors.email = "Please enter a valid email address.";

  if (message.length < CONTACT_LIMITS.message.min) {
    errors.message = `Please write at least ${CONTACT_LIMITS.message.min} characters.`;
  } else if (message.length > CONTACT_LIMITS.message.max) {
    errors.message = `Please keep your message under ${CONTACT_LIMITS.message.max} characters.`;
  }

  return errors;
}
