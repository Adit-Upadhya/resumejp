/**
 * Pre-written 志望動機 (motivation statement) samples by arubaito job type
 * (roadmap item 3). Each category has two "angle" variants — the two most
 * common honest motivations for part-time work: applying close to home/school,
 * and wanting to improve Japanese. Written in natural business keigo with an
 * English gloss so foreign applicants understand what they are submitting.
 *
 * Plain data module (no JSX) so it can be reused by the /arubaito-resume
 * landing page now and the editor's 志望動機 picker later.
 */

export interface ShidoSample {
  /** "near" = near home/school · "japanese" = wants to improve Japanese */
  angle: "near" | "japanese";
  jp: string;
  en: string;
}

export interface ShidoCategory {
  id: string;
  /** English label */
  label: string;
  /** Japanese label */
  jp: string;
  samples: ShidoSample[];
}

export const SHIDO_CATEGORIES: ShidoCategory[] = [
  {
    id: "konbini",
    label: "Convenience store",
    jp: "コンビニ",
    samples: [
      {
        angle: "near",
        jp: "自宅から近く、長く続けられるアルバイトを探しておりました。学業と両立しながら、朝の品出しから接客まで幅広く対応し、お店の運営にしっかり貢献したいと考えております。明るい対応を心がけ、お客様に気持ちよくご利用いただけるよう努めます。",
        en: "I was looking for a job close to home that I can continue long-term. While balancing my studies, I want to handle everything from morning stocking to customer service and contribute to running the store. I will work cheerfully so customers feel welcome.",
      },
      {
        angle: "japanese",
        jp: "日本語をより実践的に身につけたいと考え、毎日多くのお客様と接するコンビニでのお仕事に魅力を感じ応募いたしました。レジや接客を通じて自然な敬語を学びながら、正確で丁寧な対応を心がけ、長く貢献したいと考えております。",
        en: "I want to improve my Japanese in a practical setting, so I was drawn to convenience-store work where I interact with many customers daily. Through the register and customer service I hope to learn natural keigo while working accurately and politely, and contribute for the long term.",
      },
    ],
  },
  {
    id: "restaurant",
    label: "Restaurant / izakaya",
    jp: "飲食店・居酒屋",
    samples: [
      {
        angle: "near",
        jp: "学校から近く、活気のある御社の雰囲気に惹かれて応募いたしました。ホール業務を通じてお客様に喜んでいただける接客を学び、忙しい時間帯でも落ち着いて対応できるよう努めてまいります。チームで協力して働くことを大切にしたいと考えております。",
        en: "Your lively atmosphere and the location near my school drew me to apply. Through floor work I want to learn customer service that makes guests happy, and stay calm even during busy hours. I value working together as a team.",
      },
      {
        angle: "japanese",
        jp: "接客を通じて日本語の会話力を高めたいと考え、応募いたしました。注文の受け答えやお客様との会話の中で自然な表現を身につけながら、笑顔と丁寧な対応を心がけ、お店の力になれるよう努力いたします。",
        en: "I applied because I want to improve my conversational Japanese through customer service. While picking up natural expressions when taking orders and talking with guests, I will work with a smile and polite manner and do my best to help the restaurant.",
      },
    ],
  },
  {
    id: "cafe",
    label: "Cafe",
    jp: "カフェ",
    samples: [
      {
        angle: "near",
        jp: "落ち着いた空間で丁寧な接客ができる御社で働きたいと思い、応募いたしました。自宅から通いやすく、長く続けられる点も魅力です。ドリンク作りや接客を一つひとつ丁寧に覚え、お客様にくつろいでいただける時間を提供したいと考えております。",
        en: "I want to work at your cafe, where I can provide careful service in a calm space. It is easy to commute from home and something I can continue long-term. I will learn drink preparation and service carefully and help give customers a relaxing time.",
      },
      {
        angle: "japanese",
        jp: "お客様との会話を通じて日本語を上達させたいと考え、応募いたしました。丁寧な言葉づかいが求められるカフェでのお仕事は、自分を成長させる良い機会だと感じております。明るく誠実な対応を心がけ、貢献してまいります。",
        en: "I applied because I want to improve my Japanese through conversation with customers. Cafe work, which calls for polite language, feels like a great chance to grow. I will work brightly and sincerely and contribute to the team.",
      },
    ],
  },
  {
    id: "factory",
    label: "Factory / warehouse",
    jp: "工場・倉庫",
    samples: [
      {
        angle: "near",
        jp: "自宅から通いやすく、安定して長く働ける環境を探しておりました。集中力には自信があり、決められた手順を正確に守りながら、丁寧かつ効率的に作業を進めることが得意です。真面目に取り組み、現場の戦力になれるよう努めてまいります。",
        en: "I was looking for a stable, long-term workplace that is easy to commute to from home. I am confident in my concentration, and I am good at following set procedures accurately while working carefully and efficiently. I will work diligently and aim to be a reliable member of the team.",
      },
      {
        angle: "japanese",
        jp: "日本での就労経験を積みながら日本語にも慣れていきたいと考え、応募いたしました。体力には自信があり、指示を正確に理解して行動することを心がけております。分からないことは早めに確認し、安全第一で丁寧に作業を進めてまいります。",
        en: "I applied because I want to build work experience in Japan while getting used to the language. I am confident in my stamina and make sure to understand instructions accurately before acting. I will check anything unclear early and work carefully with safety first.",
      },
    ],
  },
  {
    id: "hotel",
    label: "Hotel / cleaning",
    jp: "ホテル・清掃",
    samples: [
      {
        angle: "near",
        jp: "自宅から近く、長期で働ける点に魅力を感じ応募いたしました。細かいところまで気を配る丁寧な作業が得意で、お客様が快適に過ごせる清潔な空間づくりに貢献したいと考えております。責任を持って最後まで取り組んでまいります。",
        en: "I applied because the job is near home and I can work long-term. I am good at careful, detail-oriented work and want to help create clean spaces where guests can stay comfortably. I will take responsibility and see tasks through to the end.",
      },
      {
        angle: "japanese",
        jp: "日本のおもてなしを学びながら、日本語も上達させたいと考え応募いたしました。決められた手順を守り、丁寧で正確な作業を心がけております。お客様や同僚とのやり取りを通じて言葉を学び、信頼される働きをしたいと考えております。",
        en: "I applied because I want to learn Japanese hospitality while improving my Japanese. I follow set procedures and aim for careful, accurate work. Through interactions with guests and colleagues I want to learn the language and become someone the team can rely on.",
      },
    ],
  },
  {
    id: "delivery",
    label: "Delivery",
    jp: "デリバリー",
    samples: [
      {
        angle: "near",
        jp: "土地勘のある自宅周辺で、空いた時間を活かして働きたいと考え応募いたしました。時間を守ることと安全運転を第一に、お客様に商品を丁寧にお届けいたします。体力にも自信があり、責任を持って業務に取り組んでまいります。",
        en: "I applied because I want to use my free time working in my home area, which I know well. Putting punctuality and safe driving first, I will deliver orders to customers carefully. I am confident in my stamina and will work responsibly.",
      },
      {
        angle: "japanese",
        jp: "日本での生活に慣れながら働ける仕事を探しておりました。配達を通じて地域や日本語にも親しみたいと考えております。安全と時間を守り、お客様に気持ちよく受け取っていただけるよう、丁寧な対応を心がけてまいります。",
        en: "I was looking for a job where I can work while getting used to life in Japan. Through delivery I also want to become familiar with the area and the language. Keeping safety and punctuality, I will be polite so customers feel good receiving their orders.",
      },
    ],
  },
  {
    id: "moving",
    label: "Moving / light labor",
    jp: "引越し・軽作業",
    samples: [
      {
        angle: "near",
        jp: "体を動かす仕事が好きで、自宅から通いやすい御社で働きたいと考え応募いたしました。体力とチームワークには自信があり、荷物を丁寧に扱うことを心がけております。お客様に安心してお任せいただけるよう、責任を持って取り組んでまいります。",
        en: "I like physical work and want to work at your company, which is easy to commute to from home. I am confident in my stamina and teamwork, and I handle items carefully. I will work responsibly so customers can entrust their belongings to us with peace of mind.",
      },
      {
        angle: "japanese",
        jp: "日本で働きながら言葉や仕事の進め方を学びたいと考え応募いたしました。指示を正確に理解し、周囲と協力して動くことを大切にしております。体力を活かして真面目に取り組み、現場で信頼される働きをしたいと考えております。",
        en: "I applied because I want to learn the language and how work is done in Japan while working. I make sure to understand instructions accurately and value cooperating with others. Using my stamina, I will work diligently and earn the team's trust on site.",
      },
    ],
  },
  {
    id: "retail",
    label: "Retail / apparel",
    jp: "販売・アパレル",
    samples: [
      {
        angle: "near",
        jp: "以前から御社の商品が好きで、自宅からも通いやすいことから応募いたしました。お客様一人ひとりのご要望を丁寧にうかがい、気持ちのよい接客を提供したいと考えております。明るい笑顔と心配りを大切に、お店に貢献してまいります。",
        en: "I have liked your products for a while, and the store is easy to commute to from home, so I applied. I want to listen carefully to each customer's needs and provide pleasant service. Valuing a bright smile and attentiveness, I will contribute to the store.",
      },
      {
        angle: "japanese",
        jp: "接客を通じて日本語の表現力を磨きたいと考え応募いたしました。お客様との会話の中で自然な敬語を学びながら、丁寧で親しみやすい対応を心がけてまいります。商品知識も積極的に身につけ、長くお役に立ちたいと考えております。",
        en: "I applied because I want to polish my Japanese expression through customer service. While learning natural keigo in conversations with customers, I will be polite and approachable. I will also actively build product knowledge and hope to be useful for a long time.",
      },
    ],
  },
];
