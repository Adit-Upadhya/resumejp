"use client";

import * as React from "react";

const COUNTRIES = [
  { value: "日本", label: "Japan / 日本" },
  { value: "アメリカ", label: "USA / アメリカ" },
  { value: "イギリス", label: "UK / イギリス" },
  { value: "カナダ", label: "Canada / カナダ" },
  { value: "オーストラリア", label: "Australia / オーストラリア" },
  { value: "ニュージーランド", label: "New Zealand / ニュージーランド" },
  { value: "ドイツ", label: "Germany / ドイツ" },
  { value: "フランス", label: "France / フランス" },
  { value: "イタリア", label: "Italy / イタリア" },
  { value: "スペイン", label: "Spain / スペイン" },
  { value: "オランダ", label: "Netherlands / オランダ" },
  { value: "スウェーデン", label: "Sweden / スウェーデン" },
  { value: "ノルウェー", label: "Norway / ノルウェー" },
  { value: "デンマーク", label: "Denmark / デンマーク" },
  { value: "フィンランド", label: "Finland / フィンランド" },
  { value: "スイス", label: "Switzerland / スイス" },
  { value: "ポーランド", label: "Poland / ポーランド" },
  { value: "中国", label: "China / 中国" },
  { value: "韓国", label: "South Korea / 韓国" },
  { value: "台湾", label: "Taiwan / 台湾" },
  { value: "香港", label: "Hong Kong / 香港" },
  { value: "インド", label: "India / インド" },
  { value: "ネパール", label: "Nepal / ネパール" },
  { value: "パキスタン", label: "Pakistan / パキスタン" },
  { value: "バングラデシュ", label: "Bangladesh / バングラデシュ" },
  { value: "スリランカ", label: "Sri Lanka / スリランカ" },
  { value: "ミャンマー", label: "Myanmar / ミャンマー" },
  { value: "ベトナム", label: "Vietnam / ベトナム" },
  { value: "タイ", label: "Thailand / タイ" },
  { value: "フィリピン", label: "Philippines / フィリピン" },
  { value: "インドネシア", label: "Indonesia / インドネシア" },
  { value: "マレーシア", label: "Malaysia / マレーシア" },
  { value: "シンガポール", label: "Singapore / シンガポール" },
  { value: "ブラジル", label: "Brazil / ブラジル" },
  { value: "メキシコ", label: "Mexico / メキシコ" },
  { value: "アルゼンチン", label: "Argentina / アルゼンチン" },
  { value: "ロシア", label: "Russia / ロシア" },
  { value: "ウクライナ", label: "Ukraine / ウクライナ" },
  { value: "トルコ", label: "Turkey / トルコ" },
  { value: "エジプト", label: "Egypt / エジプト" },
  { value: "ナイジェリア", label: "Nigeria / ナイジェリア" },
  { value: "南アフリカ", label: "South Africa / 南アフリカ" },
  { value: "モンゴル", label: "Mongolia / モンゴル" },
  { value: "カンボジア", label: "Cambodia / カンボジア" },
  { value: "ラオス", label: "Laos / ラオス" },
  { value: "ウズベキスタン", label: "Uzbekistan / ウズベキスタン" },
];

interface CountryComboboxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function CountryCombobox({ value, onChange, placeholder = "Select or type..." }: CountryComboboxProps) {
  const listId = React.useId();

  return (
    <div className="relative">
      <input
        type="text"
        list={listId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      />
      <datalist id={listId}>
        {COUNTRIES.map((c) => (
          <option key={c.value} value={c.value}>
            {c.label}
          </option>
        ))}
      </datalist>
    </div>
  );
}
