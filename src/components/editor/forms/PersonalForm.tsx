"use client";

import { useRef, useState } from "react";
import { Camera, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Resume } from "@/lib/schema";
import { useEditorI18n } from "@/lib/i18n";
import { Field, FormSection } from "./Field";

interface Props {
  data: Resume;
  setData: React.Dispatch<React.SetStateAction<Resume>>;
}

interface ZipResult {
  address1: string;
  address2: string;
  address3: string;
  kana1: string;
  kana2: string;
  kana3: string;
}

function katakanaToHiragana(str: string): string {
  return str.replace(/[ァ-ヶ]/g, (ch) =>
    String.fromCharCode(ch.charCodeAt(0) - 0x60)
  );
}

/**
 * Loads an image file and re-encodes it down to a sensible size for the
 * passport-style photo cell (max 600×800). This bounds the stored data URL
 * regardless of how large the original upload was, keeping localStorage and
 * the PDF capture fast.
 */
function downscaleImage(file: File): Promise<string> {
  const MAX_W = 600;
  const MAX_H = 800;
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("read failed"));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("decode failed"));
      img.onload = () => {
        const scale = Math.min(1, MAX_W / img.width, MAX_H / img.height);
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          // Canvas unavailable — fall back to the original data URL.
          resolve(typeof reader.result === "string" ? reader.result : "");
          return;
        }
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/jpeg", 0.85));
      };
      img.src = typeof reader.result === "string" ? reader.result : "";
    };
    reader.readAsDataURL(file);
  });
}

async function lookupPostalCode(raw: string): Promise<ZipResult | null> {
  const digits = raw.replace(/[^0-9]/g, "");
  if (digits.length !== 7) return null;
  try {
    const res = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${digits}`);
    const json = await res.json();
    if (json.status === 200 && json.results?.length) return json.results[0] as ZipResult;
  } catch {
    // network error — ignore
  }
  return null;
}

export function PersonalForm({ data, setData }: Props) {
  const p = data.personal;
  const { copy } = useEditorI18n();
  const c = copy.personal;
  const fileRef = useRef<HTMLInputElement>(null);
  const [lookingUpMain, setLookingUpMain] = useState(false);
  const [lookingUpContact, setLookingUpContact] = useState(false);

  function update<K extends keyof Resume["personal"]>(key: K, value: Resume["personal"][K]) {
    setData((prev) => ({ ...prev, personal: { ...prev.personal, [key]: value } }));
  }

  async function handlePostalCodeChange(raw: string) {
    update("postalCode", raw);
    const digits = raw.replace(/[^0-9]/g, "");
    if (digits.length !== 7) return;
    setLookingUpMain(true);
    const result = await lookupPostalCode(raw);
    setLookingUpMain(false);
    if (!result) return;
    const address = result.address1 + result.address2 + result.address3;
    const furigana = katakanaToHiragana(result.kana1 + result.kana2 + result.kana3).toLowerCase();
    setData((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        address,
        furiganaAddress: furigana,
      },
    }));
  }

  async function handleContactPostalCodeChange(raw: string) {
    update("contactPostalCode", raw);
    const digits = raw.replace(/[^0-9]/g, "");
    if (digits.length !== 7) return;
    setLookingUpContact(true);
    const result = await lookupPostalCode(raw);
    setLookingUpContact(false);
    if (!result) return;
    const address = result.address1 + result.address2 + result.address3;
    const furigana = katakanaToHiragana(result.kana1 + result.kana2 + result.kana3).toLowerCase();
    setData((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        contactAddress: address,
        furiganaContact: furigana,
      },
    }));
  }

  async function onPhotoChange(file: File) {
    // Hard cap on the source file so a huge upload can't lock up the browser
    // or blow past the localStorage quota. The image is downscaled to a small
    // photo cell anyway, so a conservative cap is plenty.
    const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5 MB
    if (!file.type.startsWith("image/")) {
      toast.error(copy.toasts.photoNotImage);
      return;
    }
    if (file.size > MAX_FILE_BYTES) {
      toast.error(copy.toasts.photoTooLarge);
      return;
    }
    try {
      const dataUrl = await downscaleImage(file);
      update("photoDataUrl", dataUrl);
    } catch {
      toast.error(copy.toasts.photoReadFailed);
    }
  }

  return (
    <div className="space-y-6">
      <FormSection title={c.section} description={c.sectionDesc}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label={c.fullName}>
            <Input
              value={p.fullName}
              onChange={(e) => update("fullName", e.target.value)}
              placeholder="RAM BAHADUR"
            />
          </Field>
          <Field label={c.furigana}>
            <Input
              value={p.furiganaName}
              onChange={(e) => update("furiganaName", e.target.value)}
              placeholder="ラム バハドゥル"
            />
          </Field>
          <Field label={c.dob}>
            <Input
              type="date"
              value={p.dateOfBirth}
              onChange={(e) => update("dateOfBirth", e.target.value)}
            />
          </Field>
          <Field label={c.gender}>
            <Select value={p.gender || undefined} onValueChange={(v) => update("gender", v as "male" | "female")}>
              <SelectTrigger>
                <SelectValue placeholder={c.select} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">{c.male}</SelectItem>
                <SelectItem value="female">{c.female}</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label={c.nationality} className="sm:col-span-2">
            <Input
              value={p.nationality}
              onChange={(e) => update("nationality", e.target.value)}
              placeholder="アメリカ / Nepal / 日本 ..."
            />
          </Field>
        </div>

        <div className="pt-2">
          <Field label={c.photo} hint={c.photoHint}>
            <div className="flex items-center gap-3">
              <div className="h-24 w-[72px] rounded-md border bg-zinc-50 overflow-hidden flex items-center justify-center text-xs text-muted-foreground">
                {p.photoDataUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.photoDataUrl} alt="" className="h-full w-full object-cover" />
                ) : (
                  <Camera className="h-5 w-5" />
                )}
              </div>
              <div className="flex flex-col gap-2">
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && onPhotoChange(e.target.files[0])}
                />
                <Button size="sm" variant="outline" onClick={() => fileRef.current?.click()}>
                  <Camera className="h-3.5 w-3.5" /> {c.uploadPhoto}
                </Button>
                {p.photoDataUrl && (
                  <Button size="sm" variant="ghost" onClick={() => update("photoDataUrl", "")}>
                    <Trash2 className="h-3.5 w-3.5" /> {c.remove}
                  </Button>
                )}
              </div>
            </div>
          </Field>
        </div>
      </FormSection>

      <FormSection title={c.addressSection}>
        <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
          <Field label={c.furigana} className="sm:col-span-6">
            <Input
              value={p.furiganaAddress}
              onChange={(e) => update("furiganaAddress", e.target.value)}
              placeholder="とうきょうとちよだく ..."
            />
          </Field>
          <Field label={c.postalCode} className="sm:col-span-2">
            <div className="relative">
              <Input
                value={p.postalCode}
                onChange={(e) => handlePostalCodeChange(e.target.value)}
                placeholder="102-0072"
                className={lookingUpMain ? "pr-8" : ""}
              />
              {lookingUpMain && (
                <Loader2 className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
              )}
            </div>
          </Field>
          <Field label={c.address} className="sm:col-span-4">
            <Input
              value={p.address}
              onChange={(e) => update("address", e.target.value)}
              placeholder="東京都千代田区飯田橋..."
            />
          </Field>
          <Field label={c.phone} className="sm:col-span-3">
            <Input
              value={p.phone}
              onChange={(e) => update("phone", e.target.value)}
              placeholder="090-0000-0000"
            />
          </Field>
          <Field label={c.email} className="sm:col-span-3">
            <Input
              type="email"
              value={p.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="you@example.com"
            />
          </Field>
        </div>
      </FormSection>

      <FormSection title={c.contactSection} description={c.contactDesc}>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={p.contactSameAsAbove}
            onChange={(e) => update("contactSameAsAbove", e.target.checked)}
            className="h-4 w-4"
          />
          {c.sameAsAbove}
        </label>

        {!p.contactSameAsAbove && (
          <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
            <Field label={c.furigana} className="sm:col-span-6">
              <Input
                value={p.furiganaContact}
                onChange={(e) => update("furiganaContact", e.target.value)}
              />
            </Field>
            <Field label={c.postalCode} className="sm:col-span-2">
              <div className="relative">
                <Input
                  value={p.contactPostalCode}
                  onChange={(e) => handleContactPostalCodeChange(e.target.value)}
                  placeholder="102-0072"
                  className={lookingUpContact ? "pr-8" : ""}
                />
                {lookingUpContact && (
                  <Loader2 className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
                )}
              </div>
            </Field>
            <Field label={c.address} className="sm:col-span-4">
              <Input
                value={p.contactAddress}
                onChange={(e) => update("contactAddress", e.target.value)}
              />
            </Field>
            <Field label={c.phone} className="sm:col-span-3">
              <Input
                value={p.contactPhone}
                onChange={(e) => update("contactPhone", e.target.value)}
              />
            </Field>
            <Field label={c.email} className="sm:col-span-3">
              <Input
                type="email"
                value={p.contactEmail}
                onChange={(e) => update("contactEmail", e.target.value)}
              />
            </Field>
          </div>
        )}
      </FormSection>
    </div>
  );
}
