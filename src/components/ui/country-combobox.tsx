"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

const COUNTRIES = [
  { value: "日本", label: "🇯🇵 Japan / 日本" },
  { value: "アメリカ", label: "🇺🇸 USA / アメリカ" },
  { value: "イギリス", label: "🇬🇧 UK / イギリス" },
  { value: "カナダ", label: "🇨🇦 Canada / カナダ" },
  { value: "オーストラリア", label: "🇦🇺 Australia / オーストラリア" },
  { value: "ニュージーランド", label: "🇳🇿 New Zealand / ニュージーランド" },
  { value: "ドイツ", label: "🇩🇪 Germany / ドイツ" },
  { value: "フランス", label: "🇫🇷 France / フランス" },
  { value: "イタリア", label: "🇮🇹 Italy / イタリア" },
  { value: "スペイン", label: "🇪🇸 Spain / スペイン" },
  { value: "オランダ", label: "🇳🇱 Netherlands / オランダ" },
  { value: "スウェーデン", label: "🇸🇪 Sweden / スウェーデン" },
  { value: "ノルウェー", label: "🇳🇴 Norway / ノルウェー" },
  { value: "デンマーク", label: "🇩🇰 Denmark / デンマーク" },
  { value: "フィンランド", label: "🇫🇮 Finland / フィンランド" },
  { value: "スイス", label: "🇨🇭 Switzerland / スイス" },
  { value: "ポーランド", label: "🇵🇱 Poland / ポーランド" },
  { value: "中国", label: "🇨🇳 China / 中国" },
  { value: "韓国", label: "🇰🇷 South Korea / 韓国" },
  { value: "台湾", label: "🇹🇼 Taiwan / 台湾" },
  { value: "香港", label: "🇭🇰 Hong Kong / 香港" },
  { value: "インド", label: "🇮🇳 India / インド" },
  { value: "ネパール", label: "🇳🇵 Nepal / ネパール" },
  { value: "パキスタン", label: "🇵🇰 Pakistan / パキスタン" },
  { value: "バングラデシュ", label: "🇧🇩 Bangladesh / バングラデシュ" },
  { value: "スリランカ", label: "🇱🇰 Sri Lanka / スリランカ" },
  { value: "ミャンマー", label: "🇲🇲 Myanmar / ミャンマー" },
  { value: "ベトナム", label: "🇻🇳 Vietnam / ベトナム" },
  { value: "タイ", label: "🇹🇭 Thailand / タイ" },
  { value: "フィリピン", label: "🇵🇭 Philippines / フィリピン" },
  { value: "インドネシア", label: "🇮🇩 Indonesia / インドネシア" },
  { value: "マレーシア", label: "🇲🇾 Malaysia / マレーシア" },
  { value: "シンガポール", label: "🇸🇬 Singapore / シンガポール" },
  { value: "ブラジル", label: "🇧🇷 Brazil / ブラジル" },
  { value: "メキシコ", label: "🇲🇽 Mexico / メキシコ" },
  { value: "アルゼンチン", label: "🇦🇷 Argentina / アルゼンチン" },
  { value: "ロシア", label: "🇷🇺 Russia / ロシア" },
  { value: "ウクライナ", label: "🇺🇦 Ukraine / ウクライナ" },
  { value: "トルコ", label: "🇹🇷 Turkey / トルコ" },
  { value: "エジプト", label: "🇪🇬 Egypt / エジプト" },
  { value: "ナイジェリア", label: "🇳🇬 Nigeria / ナイジェリア" },
  { value: "南アフリカ", label: "🇿🇦 South Africa / 南アフリカ" },
  { value: "モンゴル", label: "🇲🇳 Mongolia / モンゴル" },
  { value: "カンボジア", label: "🇰🇭 Cambodia / カンボジア" },
  { value: "ラオス", label: "🇱🇦 Laos / ラオス" },
  { value: "ウズベキスタン", label: "🇺🇿 Uzbekistan / ウズベキスタン" },
];

interface CountryComboboxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function CountryCombobox({ value, onChange, placeholder = "Select or type..." }: CountryComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(value ?? "");

  // Keep inputValue in sync when parent resets
  React.useEffect(() => {
    setInputValue(value ?? "");
  }, [value]);

  const matched = COUNTRIES.find((c) => c.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between font-normal"
        >
          <span className="truncate">{matched ? matched.label : value || placeholder}</span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
        <Command>
          <CommandInput
            placeholder="Search country..."
            value={inputValue}
            onValueChange={(v) => {
              setInputValue(v);
              onChange(v); // allow free-typing too
            }}
          />
          <CommandList className="max-h-48 overflow-y-auto">
            <CommandEmpty>
              <span className="text-muted-foreground">No match — keeping &quot;{inputValue}&quot;</span>
            </CommandEmpty>
            <CommandGroup>
              {COUNTRIES.map((country) => (
                <CommandItem
                  key={country.value}
                  value={country.label}
                  onSelect={() => {
                    onChange(country.value);
                    setInputValue(country.value);
                    setOpen(false);
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", value === country.value ? "opacity-100" : "opacity-0")} />
                  {country.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
