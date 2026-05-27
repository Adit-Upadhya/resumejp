import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function computeAge(dateOfBirth: string): string {
  if (!dateOfBirth) return "";
  const dob = new Date(dateOfBirth);
  if (Number.isNaN(dob.getTime())) return "";
  const now = new Date();
  let age = now.getFullYear() - dob.getFullYear();
  const m = now.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < dob.getDate())) age--;
  return String(age);
}

export function formatDobJp(dateOfBirth: string): string {
  if (!dateOfBirth) return "";
  const d = new Date(dateOfBirth);
  if (Number.isNaN(d.getTime())) return "";
  const age = computeAge(dateOfBirth);
  return `${d.getFullYear()}年 ${d.getMonth() + 1}月 ${d.getDate()}日生（満${age}歳）`;
}

export function formatPostalCode(raw: string): string {
  const digits = raw.replace(/\D/gu, "");
  if (digits.length <= 3) return digits;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}`;
}
