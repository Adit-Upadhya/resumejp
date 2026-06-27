import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Blog content lives here as structured data so /blog (hub) and /blog/[slug]
 * (article) share one source of truth — metadata, JSON-LD, the hub list, and
 * the sitemap all read from POSTS. Each post's `Body` is a small component so
 * articles can use rich formatting and internal links while staying type-safe.
 *
 * These are genuinely useful, foreigner-aware guides aimed at part-time
 * (arubaito) job seekers in Japan — the exact questions people search for in
 * the hour before they reach a resume tool. Substantial original content here
 * is also what satisfies AdSense's content requirements and earns rankings in
 * Google and AI search (ChatGPT / Claude / Gemini).
 */

export interface BlogPost {
  slug: string;
  title: string;
  /** Short title for cards / breadcrumbs. */
  cardTitle: string;
  description: string;
  keywords: string[];
  /** ISO date — also used for Article schema + sitemap lastmod. */
  date: string;
  readingTime: string;
  category: string;
  Body: () => ReactNode;
}

// Shared prose primitives. Visuals come from the scoped `.editorial-prose`
// rules in globals.css (serif headings with a seal ○ marker, em-dash list
// markers, seal-underlined links); these just set rhythm and sizing.
const H2 = ({ children }: { children: ReactNode }) => (
  <h2 className="mt-12 text-[1.35rem] sm:text-[1.6rem] leading-snug tracking-tight">{children}</h2>
);
const P = ({ children, className }: { children: ReactNode; className?: string }) => (
  <p className={`mt-4 text-[0.95rem] sm:text-[1.03rem] leading-[1.8] ${className ?? ""}`}>
    {children}
  </p>
);
const UL = ({ children }: { children: ReactNode }) => (
  <ul className="mt-4 space-y-2.5 text-[0.95rem] sm:text-[1.03rem] leading-[1.7]">{children}</ul>
);
const A = ({ href, children }: { href: string; children: ReactNode }) => (
  <Link href={href}>{children}</Link>
);

export const POSTS: BlogPost[] = [
  {
    slug: "28-hour-rule-students-work-limit",
    title:
      "The 28-Hour Rule for Students: What It Means and How to Show It on Your Resume",
    cardTitle: "The 28-hour work rule for students",
    description:
      "Student visa holders in Japan can work 28 hours a week with a 資格外活動許可. Here is exactly what the rule covers, the long-vacation exception, and how to show your work permission on a part-time rirekisho.",
    keywords: [
      "28 hour rule Japan student",
      "資格外活動許可",
      "student visa work hours Japan",
      "留学 アルバイト 時間",
      "part time work limit Japan student",
      "週28時間",
    ],
    date: "2026-06-20",
    readingTime: "5 min read",
    category: "Visa & rules",
    Body: () => (
      <>
        <P>
          If you are in Japan on a student visa (在留資格「留学」) you are allowed to work part-time,
          but only after you get a <strong>資格外活動許可</strong> (permission to engage in activity
          outside your status) and only up to a fixed number of hours. Getting this wrong is one of
          the few resume mistakes that can affect your visa, so it is worth understanding clearly.
        </P>

        <H2>What the 28-hour rule actually says</H2>
        <P>
          With a valid 資格外活動許可, a student may work up to <strong>28 hours per week</strong>.
          The limit is on hours <em>worked</em>, not hours scheduled, and it applies to the total
          across every job — if you have two part-time jobs, the hours are added together. The week
          is counted no matter which day you treat as the start, so you cannot &ldquo;reset&rdquo;
          the count by switching employers mid-week.
        </P>
        <P>
          Dependents (家族滞在) are under the same 28-hour limit. Working beyond the cap is treated
          as unauthorised work and can put a future visa renewal at risk, so most store managers
          will check that your hours stay inside it.
        </P>

        <H2>The long-vacation exception</H2>
        <P>
          During your school&apos;s official long holidays (summer, winter, and spring breaks), the
          limit rises to <strong>8 hours per day, up to 40 hours per week</strong>. This only
          applies to periods the school formally designates as vacation — not to ordinary weekends
          during term. Keep this in mind when you promise availability: it is fine to offer more
          hours in August, but do not commit to 40-hour weeks year-round.
        </P>

        <H2>How to get the permission</H2>
        <P>
          You apply for the 資格外活動許可 at your regional immigration office, or request it at the
          airport when you first land with a student visa. It is free, and once granted it is noted
          on the back of your 在留カード (residence card). You cannot legally start a part-time job
          until it is approved.
        </P>

        <H2>How to show it on your rirekisho</H2>
        <P>
          Employers want to see, at a glance, that you are allowed to work. The cleanest way is to
          state your residence status and your permission together. In the licences/notes area, a
          single line such as the following removes any doubt:
        </P>
        <UL>
          <li>在留資格：留学（資格外活動許可あり・週28時間以内）</li>
          <li>
            In English: &ldquo;Residence status: Student. Permission to work outside status granted
            (within 28 hours/week).&rdquo;
          </li>
        </UL>
        <P>
          ResumeJP&apos;s part-time template has dedicated residence-status fields, and when you
          select 留学 or 家族滞在 it can print the 週28時間以内 note for you. You can{" "}
          <A href="/arubaito-resume">start a part-time rirekisho here</A> or jump straight into the{" "}
          <A href="/editor">editor</A>.
        </P>

        <H2>What counts toward your 28 hours</H2>
        <P>
          The cap counts <em>actual hours worked</em>, including paid training and any paid breaks,
          across every job you hold. A few points that catch people out:
        </P>
        <UL>
          <li>
            <strong>Two jobs are added together.</strong> 15 hours at a konbini plus 15 at a
            restaurant is 30 — over the limit, even though each job alone is under it.
          </li>
          <li>
            <strong>The week does not reset by employer.</strong> Immigration looks at your total
            weekly hours, not each contract separately.
          </li>
          <li>
            <strong>Unpaid, genuine breaks do not count</strong>, but paid standby or paid training
            does. When in doubt, count it.
          </li>
          <li>
            <strong>Excluded workplaces never qualify</strong>, no matter the hours — bars, pachinko
            parlours, and other adult-entertainment businesses are off-limits on a student permit.
          </li>
        </UL>

        <H2>What happens if you go over</H2>
        <P>
          Exceeding 28 hours is unauthorised work. The realistic risk is not an on-the-spot fine but
          a problem the next time you deal with immigration: a visa extension or a change of status
          can be refused if your records show you worked beyond the limit, and in serious or repeated
          cases it can affect your ability to stay in Japan. Employers know this too, which is why a
          responsible store manager will keep your hours inside the cap. Treat the limit as a hard
          line, not a target — and if a manager pushes you to work more &ldquo;off the books,&rdquo;
          that is a red flag for you, not just for them.
        </P>

        <H2>When the rule does not apply to you</H2>
        <P>
          The 28-hour rule is tied to the student and dependent statuses. If you hold a work visa
          such as 技術・人文知識・国際業務, a 特定技能 status, 永住者 (permanent resident),
          定住者, or 日本人の配偶者等, you are not bound by the 28-hour cap (though work visas have
          their own scope rules about <em>what kind</em> of work you may do). On a part-time resume,
          the key is to state your actual status accurately — see{" "}
          <A href="/arubaito-resume">the part-time resume guide</A> for how each status appears on
          the sheet.
        </P>

        <H2>Quick checklist before you apply for a baito</H2>
        <UL>
          <li>Do you hold a valid 資格外活動許可? (Check the back of your residence card.)</li>
          <li>Will your total weekly hours across all jobs stay at or under 28?</li>
          <li>Is the work outside the excluded categories (e.g. adult-entertainment venues)?</li>
          <li>Have you written your status and permission clearly on the resume?</li>
        </UL>
        <P>
          For the rest of the sheet, see our guide on{" "}
          <A href="/guide/how-to-write-a-japanese-resume">how to write a Japanese resume</A>.
        </P>
      </>
    ),
  },
  {
    slug: "rirekisho-photo-rules",
    title: "Rirekisho Photo Rules — and How to Take a Good One with Your Phone",
    cardTitle: "Rirekisho photo rules (and phone tips)",
    description:
      "The 30×40 mm rirekisho photo has strict rules on size, background, attire, and freshness. Here is the full checklist plus how to shoot a passable one with your smartphone and print it at a konbini.",
    keywords: [
      "rirekisho photo size",
      "履歴書 写真 サイズ",
      "Japanese resume photo rules",
      "30x40 photo Japan",
      "resume photo with phone",
      "証明写真 スマホ",
    ],
    date: "2026-06-20",
    readingTime: "5 min read",
    category: "Photo & printing",
    Body: () => (
      <>
        <P>
          The photo (証明写真) is the first thing a Japanese employer sees on your rirekisho, and a
          poor one quietly makes the whole application look careless. The good news: the rules are
          fixed and easy to meet, and you no longer need an ¥800 photo booth to get an acceptable
          result.
        </P>

        <H2>The fixed rules</H2>
        <UL>
          <li>
            <strong>Size:</strong> 30 mm wide × 40 mm tall. This is the standard cell on every
            rirekisho.
          </li>
          <li>
            <strong>Freshness:</strong> taken within the last 3 months.
          </li>
          <li>
            <strong>Background:</strong> plain and light — white, pale blue, or light grey. No
            rooms, walls, or patterns behind you.
          </li>
          <li>
            <strong>Framing:</strong> front-facing, head and shoulders, face filling roughly 70–80%
            of the frame, eyes looking at the camera.
          </li>
          <li>
            <strong>Attire:</strong> business clothing — a dark suit or collared shirt is the safe
            default, even for part-time roles.
          </li>
          <li>
            <strong>Expression:</strong> neutral with a very slight, relaxed look. No big smile, no
            hat, no heavy filter, no sunglasses.
          </li>
        </UL>

        <H2>Taking it with your phone</H2>
        <P>
          A smartphone photo is fine for almost all arubaito applications if you set it up well:
        </P>
        <UL>
          <li>Stand about 1.5 m from a plain light wall, with the light in front of you.</li>
          <li>Use daylight from a window — avoid overhead light that casts shadows under your eyes.</li>
          <li>Have someone else take it, or use a tripod and timer, at eye level (not from below).</li>
          <li>Keep shoulders square and centred; leave a little space above your head.</li>
          <li>Do not beautify or smooth your skin — recruiters expect a realistic photo.</li>
        </UL>
        <P>
          Several free apps crop to the exact 30×40 mm ratio for you. ResumeJP also resizes your
          uploaded photo to fit the standard cell automatically, so you can simply upload a clear
          phone shot in the <A href="/editor">editor</A>.
        </P>

        <H2>Printing it</H2>
        <P>
          You do not need a printer. Upload your finished rirekisho PDF to a convenience-store print
          service (7-Eleven netprint, or ネットワークプリント for FamilyMart and Lawson), get a
          reservation number, and print at the in-store multicopy machine — about ¥20 for A4 black
          and white. Use the photo-quality setting so your picture stays sharp.
        </P>

        <H2>Editing: what is fine and what is not</H2>
        <P>
          Light, honest editing is acceptable; anything that changes how you actually look is not.
        </P>
        <UL>
          <li>
            <strong>Fine:</strong> cropping to 30×40 mm, straightening, gently correcting brightness
            or colour balance, and replacing a slightly uneven wall with a clean white or pale-blue
            background.
          </li>
          <li>
            <strong>Not fine:</strong> beauty filters, skin smoothing, reshaping your face, changing
            hair or eye colour, or anything that makes the photo not match the person at the
            interview.
          </li>
        </UL>
        <P>
          The test is simple: when you walk into the interview, the manager should immediately
          recognise you from the photo. A picture that oversells reads as dishonest the moment you
          arrive.
        </P>

        <H2>Digital photos and the &ldquo;My Number&rdquo; style</H2>
        <P>
          If a job asks you to upload a photo rather than print one, the same composition rules apply.
          Save it as a clear JPEG or PNG, keep the 3:4 ratio (e.g. 600×800 px or larger), and avoid
          heavy compression that blurs your face. Many convenience-store machines and ID-photo booths
          also sell a digital copy alongside the prints, which is handy when you apply both online and
          on paper. In ResumeJP you upload the photo once and it is placed at the correct size for
          every template you export.
        </P>

        <H2>Where the photo goes, and attaching it</H2>
        <P>
          On the rirekisho the photo sits in the box at the top right, next to your name and date of
          birth. For a printed sheet you handwrite or print your name on the back of the physical
          photo before attaching it, in case it comes loose, and use a glue stick rather than tape or
          staples. With ResumeJP the photo is printed directly into the sheet, so there is nothing to
          glue — but if you hand-fill a blank template, this small detail still matters to tidy
          employers.
        </P>

        <H2>Common photo mistakes</H2>
        <UL>
          <li>A busy or coloured background (bedroom, street, curtains).</li>
          <li>A cropped selfie at arm&apos;s length — the angle and distance look informal.</li>
          <li>Casual clothing such as a t-shirt or hoodie.</li>
          <li>An old photo that no longer looks like you.</li>
          <li>A low-resolution image that prints blurry or pixelated.</li>
        </UL>
        <P>
          Once your photo is sorted, walk through the rest of the sheet with our{" "}
          <A href="/guide/how-to-write-a-japanese-resume">step-by-step rirekisho guide</A>, or start
          a part-time version on the <A href="/arubaito-resume">arubaito resume page</A>.
        </P>
      </>
    ),
  },
  {
    slug: "handwritten-vs-printed-rirekisho",
    title: "Handwritten vs. Printed Rirekisho for Baito: Which Do Employers Prefer?",
    cardTitle: "Handwritten vs. printed rirekisho",
    description:
      "Should you handwrite or print your part-time rirekisho? The honest answer for 2026, when handwriting still helps, when printed is perfectly fine, and how to do each one well.",
    keywords: [
      "handwritten vs printed rirekisho",
      "履歴書 手書き パソコン",
      "rirekisho handwritten baito",
      "Japanese resume handwritten or typed",
      "履歴書 印刷 バイト",
    ],
    date: "2026-06-20",
    readingTime: "4 min read",
    category: "Applying",
    Body: () => (
      <>
        <P>
          For decades, conventional wisdom in Japan was that a serious rirekisho should be
          handwritten. That has changed — but not everywhere. Here is how to decide for a part-time
          (arubaito) application.
        </P>

        <H2>The short answer</H2>
        <P>
          For most arubaito today — convenience stores, cafes, restaurants, retail, delivery,
          warehouses — a <strong>cleanly printed rirekisho is completely acceptable</strong>, and
          often preferred because it is easy to read. Typed resumes are the norm for any company
          that does its hiring online or asks you to email documents.
        </P>

        <H2>When handwriting still helps</H2>
        <UL>
          <li>
            Small, traditional, family-run businesses where the owner is older may still read
            neat handwriting as a sign of sincerity and effort.
          </li>
          <li>
            A few job ads explicitly say 手書き希望 (handwriting preferred). If it is written,
            follow it.
          </li>
          <li>
            If your typed Japanese might contain conversion errors you cannot check, careful
            handwriting can actually be safer.
          </li>
        </UL>

        <H2>When printed is the better choice</H2>
        <UL>
          <li>You are applying online or by email (most modern baito platforms).</li>
          <li>Your handwriting in Japanese is not yet confident or even.</li>
          <li>You are applying to several stores and want a consistent, fast-to-update document.</li>
          <li>The role is at a chain, a modern company, or anything tech/web related.</li>
        </UL>

        <H2>If you handwrite</H2>
        <UL>
          <li>Use black ink, write slowly and evenly, and never use correction fluid.</li>
          <li>If you make a mistake, start the sheet again — crossed-out text looks unprofessional.</li>
          <li>Keep character sizes consistent and stay inside the lines.</li>
        </UL>

        <H2>If you print</H2>
        <UL>
          <li>Export a clean PDF at the correct size and print it at a convenience store.</li>
          <li>Use plain white paper; the traditional layout prints on A3 folded, or two A4 pages.</li>
          <li>Sign or stamp where required, and double-check the photo printed sharply.</li>
        </UL>

        <H2>What about an emailed PDF?</H2>
        <P>
          More and more part-time roles never ask for paper at all — you apply through Townwork,
          Indeed, or a store&apos;s LINE and send a PDF. In that case &ldquo;handwritten vs
          printed&rdquo; is moot: a typed PDF is expected. Name the file clearly (for example,
          <em> rirekisho_yourname.pdf</em>), keep it under a few megabytes so it sends easily, and
          double-check it opens correctly on a phone, since that is how the manager will first see
          it.
        </P>

        <H2>A 30-second decision</H2>
        <UL>
          <li>Ad says 手書き希望 → handwrite.</li>
          <li>Applying online or by email → typed PDF.</li>
          <li>Small, traditional, older owner → handwriting can score points.</li>
          <li>Chain, modern, or web/IT company → typed is expected.</li>
          <li>Not confident writing Japanese by hand → typed is the safer choice.</li>
        </UL>

        <H2>What matters far more than the medium</H2>
        <P>
          Hiring managers rarely reject a candidate purely for typing instead of writing. What
          actually decides a part-time application is whether the important fields are right: an
          accurate, readable shift-availability grid; correct dates; your residence status and work
          permission stated clearly; and a short, honest 志望動機 that names this specific store.
          Get those right and the format is a footnote.
        </P>
        <P>
          The fastest reliable route is to build it once and export a print-ready PDF — pick a
          layout on the <A href="/templates">templates page</A> or start straight away in the{" "}
          <A href="/editor">editor</A>. For the shift grid and motivation samples, see the{" "}
          <A href="/arubaito-resume">part-time resume guide</A>.
        </P>
      </>
    ),
  },
  {
    slug: "honnin-kibo-kinyuran-part-time",
    title: "How to Fill In the 本人希望記入欄 for a Part-Time Job",
    cardTitle: "Filling in the 本人希望記入欄",
    description:
      "The 本人希望記入欄 (applicant's request field) trips up many part-time applicants. Learn the safe default phrase, when to state shift or start-date constraints, and the salary mistake to avoid.",
    keywords: [
      "本人希望記入欄 書き方",
      "honnin kibo kinyuran",
      "rirekisho request field part time",
      "履歴書 本人希望欄 バイト",
      "Japanese resume preferences field",
    ],
    date: "2026-06-20",
    readingTime: "4 min read",
    category: "Writing tips",
    Body: () => (
      <>
        <P>
          The 本人希望記入欄 (applicant&apos;s request field) sits near the bottom of the rirekisho.
          It is small, but applicants often either leave it blank or fill it with the wrong thing.
          Here is how to use it well for an arubaito application.
        </P>

        <H2>The safe default</H2>
        <P>
          If you have no special conditions, do not leave the box empty — write the standard line:
        </P>
        <UL>
          <li>
            <strong>貴社の規定に従います。</strong> (&ldquo;I will follow your company&apos;s
            policies.&rdquo;)
          </li>
        </UL>
        <P>
          This shows you are flexible and easy to hire, which is exactly what a shift manager wants
          to read.
        </P>

        <H2>When you do have a real constraint</H2>
        <P>
          For part-time work, this field is the right place to state a genuine, fixed limitation —
          briefly and politely. Good examples:
        </P>
        <UL>
          <li>勤務は平日の17時以降、土日終日勤務が可能です。 (Weekday evenings after 17:00 and all day on weekends.)</li>
          <li>学業のため、週3日程度の勤務を希望します。 (Around 3 days a week due to my studies.)</li>
          <li>○月○日以降より勤務可能です。 (Available to start from [date].)</li>
        </UL>
        <P>
          Keep it to one or two lines. Detailed weekly availability belongs in the shift-availability
          grid of the <A href="/arubaito-resume">part-time template</A>, not here.
        </P>

        <H2>The mistake to avoid</H2>
        <P>
          Do not write salary demands or a long wish-list. Stating a desired hourly wage here reads
          as pushy for a part-time role, and pay is set by the store anyway. If you must discuss it,
          do so politely at the interview. Likewise, avoid listing many conditions — each one is a
          reason the manager might pass.
        </P>

        <H2>Ready-to-use lines for common situations</H2>
        <P>Copy the closest one and adjust the specifics:</P>
        <UL>
          <li>
            <strong>Student, evenings and weekends:</strong>{" "}
            平日は17時以降、土日は終日勤務可能です。学業を優先したいため、週3〜4日を希望します。
          </li>
          <li>
            <strong>Can start after a date:</strong> ○月○日以降より勤務を開始できます。
          </li>
          <li>
            <strong>Prefer a particular store/area:</strong>{" "}
            自宅から近い○○店での勤務を希望いたします。
          </li>
          <li>
            <strong>Genuinely flexible:</strong> 勤務日・時間については貴社の規定に従います。
          </li>
        </UL>

        <H2>Part-time vs full-time use of this field</H2>
        <P>
          For full-time roles the 本人希望記入欄 is almost always just 「貴社の規定に従います。」 —
          stating conditions can look demanding. Part-time work is the one case where a short,
          concrete note about your availability is genuinely useful, because shift fit is the whole
          point of the hire. Even so, keep it to one or two lines; the detailed day-by-day picture
          belongs in the{" "}
          <A href="/arubaito-resume">shift-availability grid of the part-time template</A>.
        </P>

        <H2>Things never to put here</H2>
        <UL>
          <li>A desired hourly wage or salary negotiation.</li>
          <li>A long list of conditions — each one is a reason to pass on you.</li>
          <li>Complaints about a previous employer.</li>
          <li>&ldquo;特になし&rdquo; left as the whole answer when you actually do have a constraint.</li>
        </UL>

        <H2>A quick decision guide</H2>
        <UL>
          <li>No constraints → 貴社の規定に従います。</li>
          <li>Real schedule limit → one short, polite line about days/times.</li>
          <li>Fixed start date → state it clearly.</li>
          <li>Salary, perks, long demands → leave them out.</li>
        </UL>
        <P>
          For the rest of the form, the{" "}
          <A href="/guide/how-to-write-a-japanese-resume">complete rirekisho guide</A> walks through
          every section in order.
        </P>
      </>
    ),
  },
  {
    slug: "phone-script-after-applying-baito",
    title: "What to Say When You Call the Store After Applying (With a Phone Script)",
    cardTitle: "Phone script after applying",
    description:
      "Many arubaito are won or lost on the phone call. Here is a polite Japanese phone script for calling a store after applying — what to say, when to call, and how to handle keigo if you are nervous.",
    keywords: [
      "baito phone call Japanese",
      "アルバイト 電話 かけ方",
      "part time job phone script Japan",
      "履歴書 電話 応募",
      "Japanese phone keigo job",
    ],
    date: "2026-06-20",
    readingTime: "5 min read",
    category: "Applying",
    Body: () => (
      <>
        <P>
          For many part-time jobs, the first real test is a phone call — either you call to apply, or
          you follow up after sending a resume. A short, polite call in keigo makes a strong first
          impression. Prepare it once and you can reuse it for every store.
        </P>

        <H2>Before you call</H2>
        <UL>
          <li>Call during off-peak hours — for food/retail, mid-afternoon (14:00–17:00) is safest.</li>
          <li>Be somewhere quiet with good signal. Have a pen, your schedule, and the job ad ready.</li>
          <li>Know the job title and where you saw it (Townwork, Indeed, a poster, etc.).</li>
        </UL>

        <H2>The script</H2>
        <P>When someone answers, give your name and reason for calling:</P>
        <UL>
          <li>
            「お忙しいところ失礼いたします。アルバイトの募集を拝見してお電話いたしました、〇〇と申します。
            採用ご担当の方はいらっしゃいますか。」
          </li>
          <li>
            (&ldquo;Sorry to bother you. My name is ___ and I&apos;m calling about your part-time job
            posting. May I speak to the person in charge of hiring?&rdquo;)
          </li>
        </UL>
        <P>When connected to the right person, state your request clearly:</P>
        <UL>
          <li>
            「〇〇の求人を拝見しました。ぜひ応募させていただきたいのですが、まだ募集はされていますでしょうか。」
          </li>
          <li>
            (&ldquo;I saw your posting for ___. I&apos;d like to apply — is the position still
            open?&rdquo;)
          </li>
        </UL>
        <P>If they invite you to interview, confirm the details and repeat them back:</P>
        <UL>
          <li>「かしこまりました。〇月〇日〇時に、履歴書を持って伺います。よろしくお願いいたします。」</li>
          <li>
            (&ldquo;Understood. I&apos;ll come on [date] at [time] with my resume. Thank you very
            much.&rdquo;)
          </li>
        </UL>

        <H2>If you are nervous about keigo</H2>
        <P>
          You do not need perfect Japanese — politeness and clarity matter more than fluency. Three
          phrases carry most calls: <strong>失礼いたします</strong> (excuse me),{" "}
          <strong>お願いいたします</strong> (please / thank you), and{" "}
          <strong>かしこまりました</strong> (understood). Write your script on paper and read it the
          first few times; it is completely normal.
        </P>

        <H2>If they are busy or you reach voicemail</H2>
        <P>
          If the person who answers says the manager is out, do not push — ask when to call back:
          「採用ご担当者さまは何時頃お戻りでしょうか。改めてお電話いたします。」
          (&ldquo;Around what time will the person in charge be back? I&apos;ll call again.&rdquo;)
          Then call at that time. If you get a recorded message, it is usually better to hang up and
          try again later than to leave a long voicemail in nervous Japanese — but if you do leave
          one, keep it to your name, the job, and that you will call back.
        </P>

        <H2>If the position is already filled</H2>
        <P>
          Stay gracious — Japan&apos;s part-time world is small and managers remember politeness:
          「承知いたしました。ご丁寧にありがとうございます。また機会がありましたらよろしくお願いいたします。」
          (&ldquo;Understood. Thank you for your time. I hope we might have the chance another
          time.&rdquo;) A good impression on a &ldquo;no&rdquo; call sometimes turns into a callback
          weeks later when someone quits.
        </P>

        <H2>Mini phrase glossary</H2>
        <UL>
          <li>お世話になっております — standard polite opener once you are in contact.</li>
          <li>採用ご担当者さま — the person in charge of hiring.</li>
          <li>募集はまだされていますか — &ldquo;Are you still hiring?&rdquo;</li>
          <li>履歴書を持参いたします — &ldquo;I will bring my resume.&rdquo;</li>
          <li>何卒よろしくお願いいたします — a warm, formal closing.</li>
        </UL>

        <H2>After the call</H2>
        <UL>
          <li>Note the date, time, and interviewer&apos;s name immediately.</li>
          <li>Prepare your rirekisho and print it before the interview.</li>
          <li>Arrive 5–10 minutes early with the resume in a clear file inside a white envelope.</li>
        </UL>
        <P>
          Need the resume itself? Build a part-time one in minutes on the{" "}
          <A href="/arubaito-resume">arubaito resume page</A>, then{" "}
          <A href="/editor">open the editor</A> to fill it in.
        </P>
      </>
    ),
  },
  {
    slug: "how-to-write-jiko-pr-self-pr",
    title: "How to Write 自己PR (Self-PR) on a Japanese Resume — With Examples",
    cardTitle: "Writing your 自己PR (self-PR)",
    description:
      "The 自己PR is the one free-form box hiring managers actually read. Learn the simple structure that works, what to avoid, and see editable examples for students, career changers, and part-timers.",
    keywords: [
      "自己PR 書き方",
      "jiko pr Japanese resume",
      "self PR rirekisho example",
      "自己PR 例文",
      "Japanese resume self introduction",
      "how to write self PR Japan",
    ],
    date: "2026-06-21",
    readingTime: "6 min read",
    category: "Writing tips",
    Body: () => (
      <>
        <P>
          Most of a rirekisho is fixed data — dates, schools, addresses. The 自己PR is the rare box
          where you actually write something, and it is the part a hiring manager reads most closely.
          For non-native applicants it is also the scariest, because it asks for free-form business
          Japanese. The good news: a strong 自己PR follows a simple, repeatable structure.
        </P>

        <H2>The structure that works</H2>
        <P>
          Keep it to three or four sentences and follow this order:
        </P>
        <UL>
          <li>
            <strong>Your strength</strong> — one clear trait, stated plainly (reliability,
            communication, attention to detail).
          </li>
          <li>
            <strong>Proof</strong> — one concrete example or number that shows the trait in action.
            Evidence beats adjectives.
          </li>
          <li>
            <strong>The link to this job</strong> — how that strength helps in <em>this</em> role at
            <em> this</em> company.
          </li>
        </UL>
        <P>
          That &ldquo;claim → proof → relevance&rdquo; shape is what makes a 自己PR feel genuine
          instead of generic. The proof sentence is the one most applicants skip, and the one that
          makes the difference.
        </P>

        <H2>Example: student applying for part-time work</H2>
        <P className="font-jp">
          私の強みは、最後まで責任を持ってやり遂げる点です。大学では一年間、同じカフェでアルバイトを続け、無遅刻無欠勤でシフトを守りました。貴店でも、任された仕事を丁寧に最後まで行い、信頼される一員として貢献したいと考えております。
        </P>
        <P>
          (My strength is seeing things through responsibly. I worked at the same cafe for a year
          with perfect attendance and punctuality. At your store too, I want to do my assigned tasks
          carefully and become a trusted member of the team.)
        </P>

        <H2>Example: career changer (転職)</H2>
        <P className="font-jp">
          前職では三年間、法人営業として新規顧客の開拓を担当し、二年連続で目標を達成しました。お客様の課題を丁寧にヒアリングし、最適な提案を行う力には自信があります。この経験を活かし、貴社の事業拡大に貢献したいと考えております。
        </P>
        <P>
          (In my previous job I handled new-client sales for three years and hit my target two years
          running. I am confident in listening carefully to client needs and proposing the right
          solution. I want to use this experience to help grow your business.)
        </P>

        <H2>What to avoid</H2>
        <UL>
          <li>
            Empty effort phrases like 「頑張ります」 with no substance — everyone writes them.
          </li>
          <li>Listing five strengths. One strength, well-proven, is stronger than five claimed.</li>
          <li>Copying a template word-for-word. Reviewers have read them all; change the specifics.</li>
          <li>Negativity about a past employer or yourself.</li>
        </UL>

        <H2>If business Japanese is the hard part</H2>
        <P>
          Write your three points in the language you think in — English, Nepali, whatever — focusing
          on getting the <em>content</em> right (strength, proof, relevance). Then let ResumeJP&apos;s
          translate feature rewrite them into natural keigo. It is far easier to fix the Japanese of a
          good idea than to invent both at once. Start in the{" "}
          <A href="/editor">editor</A>, or see the full sheet in our{" "}
          <A href="/guide/how-to-write-a-japanese-resume">rirekisho guide</A>.
        </P>
        <P>
          For part-time roles, the related 志望動機 (motivation) field has its own ready-made
          examples by job type on the <A href="/arubaito-resume">part-time resume page</A>.
        </P>
      </>
    ),
  },
  {
    slug: "gakureki-shokureki-education-work-history",
    title: "How to Write 学歴・職歴 (Education & Work History) on a Rirekisho",
    cardTitle: "Writing 学歴・職歴 correctly",
    description:
      "The education and work-history table has strict conventions — order, official names, entrance and exit lines, and how foreigners should list overseas schools and jobs. A field-by-field guide.",
    keywords: [
      "学歴 職歴 書き方",
      "gakureki shokureki",
      "Japanese resume work history",
      "履歴書 学歴 職歴 例",
      "education work history rirekisho foreigner",
    ],
    date: "2026-06-21",
    readingTime: "6 min read",
    category: "Writing tips",
    Body: () => (
      <>
        <P>
          The 学歴・職歴 table is the spine of the rirekisho, and it follows conventions that
          Japanese applicants learn in school. Get the order and phrasing right and you look careful;
          get them wrong and you look unfamiliar with the basics. Here is exactly how it works.
        </P>

        <H2>Order and layout</H2>
        <P>
          Everything is chronological, oldest first. Write 学歴 (education) centred on its own line,
          then list schools; skip a line, write 職歴 (work history) centred, then list jobs. Use the
          same date system (Western 西暦 or Japanese era 令和) throughout the whole resume.
        </P>

        <H2>Education (学歴)</H2>
        <UL>
          <li>
            Start from junior-high graduation or high-school entrance — you do not need primary
            school.
          </li>
          <li>
            Each school usually takes two lines: 入学 (entrance) and 卒業 (graduation), e.g.
            「○○高等学校 入学」 then 「○○高等学校 卒業」.
          </li>
          <li>
            Write the <strong>official, full name</strong> — no abbreviations, no ㈱-style symbols.
          </li>
          <li>
            For a foreign school, write the country and the school name (in katakana or as-is), and
            add the faculty/major for university.
          </li>
        </UL>

        <H2>Work history (職歴)</H2>
        <UL>
          <li>
            For each employer, write 「株式会社○○ 入社」 when you joined and the reason line when
            you left.
          </li>
          <li>
            The standard leaving line is 「一身上の都合により退社」 (left for personal reasons).
          </li>
          <li>
            If you currently work there, write 「現在に至る」 on the next line.
          </li>
          <li>
            After the last entry, write 「以上」 right-aligned on its own line to close the table.
          </li>
        </UL>

        <H2>How foreigners should handle overseas jobs</H2>
        <P>
          List overseas employers the same way, writing the company name and a short note of the
          country and your role if the name alone is not clear, for example
          「ABC Company（ネパール）入社」. You do not need to translate the company into Japanese,
          but adding the industry in parentheses helps a Japanese reader place it. For part-time
          arubaito applications, brief or unrelated past jobs are often omitted — keep the table
          focused.
        </P>

        <H2>Common mistakes</H2>
        <UL>
          <li>Mixing 西暦 and 令和 dates — pick one system everywhere.</li>
          <li>Abbreviating 株式会社 to ㈱, or shortening school names.</li>
          <li>Forgetting 現在に至る or the closing 以上.</li>
          <li>Listing jobs newest-first (it should be oldest-first).</li>
        </UL>
        <P>
          ResumeJP lays the table out for you and keeps the date format consistent automatically, so
          you fill in the facts and it handles the formatting. Open the{" "}
          <A href="/editor">editor</A> to start, or read the{" "}
          <A href="/guide/how-to-write-a-japanese-resume">full step-by-step guide</A>. If you also
          need a detailed career sheet, see{" "}
          <A href="/guide/rirekisho-vs-shokumukeirekisho">rirekisho vs 職務経歴書</A>.
        </P>
      </>
    ),
  },
  {
    slug: "jlpt-levels-which-do-you-need",
    title: "JLPT Levels Explained: Which Japanese Level Do You Need for Which Job?",
    cardTitle: "JLPT levels & which job needs which",
    description:
      "N1 to N5, and what each level realistically lets you do at work in Japan. Which level employers expect for arubaito, 特定技能, and office roles — and how to show conversational ability if you have no certificate.",
    keywords: [
      "JLPT levels explained",
      "JLPT N2 N3 jobs Japan",
      "日本語能力試験 仕事",
      "which JLPT level for work Japan",
      "Japanese level resume",
    ],
    date: "2026-06-21",
    readingTime: "6 min read",
    category: "Visa & rules",
    Body: () => (
      <>
        <P>
          The JLPT (日本語能力試験) is the certificate Japanese employers recognise most, and for a
          foreign applicant your Japanese level is often the second thing a manager checks, right
          after availability. Here is what each level means in practice and what jobs tend to expect.
        </P>

        <H2>The five levels at a glance</H2>
        <UL>
          <li>
            <strong>N5 / N4 — basic.</strong> You can read hiragana/katakana and basic kanji and
            handle simple daily conversation. Enough for many entry-level arubaito where the work is
            visual and routine.
          </li>
          <li>
            <strong>N3 — intermediate.</strong> You can follow everyday conversation at natural
            speed and handle most customer-facing part-time work comfortably.
          </li>
          <li>
            <strong>N2 — upper-intermediate.</strong> The common bar for full-time office work and
            many 特定技能 and 正社員 roles. You can read newspapers and handle business situations.
          </li>
          <li>
            <strong>N1 — advanced.</strong> Near-fluent reading and comprehension; expected for
            specialised, professional, or highly client-facing roles.
          </li>
        </UL>

        <H2>What different jobs expect</H2>
        <UL>
          <li>
            <strong>Arubaito (konbini, kitchen, warehouse):</strong> often N4–N3 is plenty; some
            accept N5 plus willingness to learn.
          </li>
          <li>
            <strong>Customer-facing part-time (cafe, retail, hotel):</strong> N3 and up is
            comfortable.
          </li>
          <li>
            <strong>特定技能 / full-time service roles:</strong> typically N3–N2 depending on
            sector.
          </li>
          <li>
            <strong>Office / 正社員:</strong> N2 is the usual minimum, N1 for many professional
            roles.
          </li>
        </UL>

        <H2>No certificate? Say it the right way</H2>
        <P>
          Plenty of capable people speak daily-conversation Japanese but have never sat the JLPT.
          Silence on this point reads to employers as &ldquo;cannot speak,&rdquo; which is worse than
          the truth. State your conversational ability in plain terms instead:
        </P>
        <UL>
          <li>日常会話レベル — can handle everyday conversation.</li>
          <li>ビジネスレベル — business-level.</li>
          <li>簡単な会話ができます — can manage simple conversation.</li>
          <li>学習中（現在N3を勉強中） — currently studying (e.g. for N3).</li>
        </UL>

        <H2>Where to put it on the resume</H2>
        <P>
          Write a JLPT pass in the licences/qualifications section as
          「日本語能力試験N2 合格」, with the year. On a part-time resume, a clear Japanese-level line
          near the top carries real weight — the{" "}
          <A href="/arubaito-resume">part-time template</A> gives it a dedicated field. Even an
          in-progress level is worth stating; it signals momentum. To add yours, open the{" "}
          <A href="/editor">editor</A>.
        </P>
      </>
    ),
  },
  {
    slug: "zairyu-shikaku-residence-status-resume",
    title: "Residence Status (在留資格) on Your Resume: A Guide for Foreign Applicants",
    cardTitle: "Residence status on your resume",
    description:
      "Your 在留資格 decides what work you can legally do in Japan, and employers need to see it. A plain-language guide to the common statuses, work permission, and exactly how to show them on a rirekisho.",
    keywords: [
      "在留資格 履歴書",
      "residence status Japan resume",
      "zairyu shikaku work",
      "visa status Japanese resume foreigner",
      "在留カード 仕事",
    ],
    date: "2026-06-21",
    readingTime: "6 min read",
    category: "Visa & rules",
    Body: () => (
      <>
        <P>
          For a foreign applicant in Japan, your 在留資格 (residence status) is not a detail — it
          decides what work you are legally allowed to do, and a careful employer will not move
          forward without knowing it. Showing it clearly on your resume removes doubt and marks you
          as someone who understands the rules.
        </P>

        <H2>The common statuses, in plain terms</H2>
        <UL>
          <li>
            <strong>留学 (Student):</strong> may do part-time work only with a 資格外活動許可, up to
            28 hours/week. See <A href="/blog/28-hour-rule-students-work-limit">the 28-hour rule</A>.
          </li>
          <li>
            <strong>家族滞在 (Dependent):</strong> same 28-hour part-time rule with permission.
          </li>
          <li>
            <strong>技術・人文知識・国際業務:</strong> a work visa for professional/office roles
            within its defined scope.
          </li>
          <li>
            <strong>特定技能 (Specified Skilled Worker):</strong> for designated industries with
            labour shortages.
          </li>
          <li>
            <strong>永住者 / 定住者 / 日本人の配偶者等:</strong> generally no restriction on the
            type of work.
          </li>
          <li>
            <strong>ワーキングホリデー:</strong> broad permission to work during the visa period.
          </li>
        </UL>

        <H2>Work permission and the residence card</H2>
        <P>
          Your status, expiry date, and any work permission are printed on your 在留カード
          (residence card). Students and dependents need the 資格外活動許可 (permission to work
          outside status) noted on the back before they can legally take a part-time job. Employers
          often ask to see the card, so what you write on the resume should match it exactly.
        </P>

        <H2>How to show it on the rirekisho</H2>
        <P>
          There is no fixed cell for this on the classic form, so put it in the qualifications/notes
          area as a clear line:
        </P>
        <UL>
          <li>在留資格：留学（資格外活動許可あり・週28時間以内）</li>
          <li>在留資格：特定技能1号（介護）</li>
          <li>在留資格：永住者</li>
        </UL>
        <P>
          If your status has an expiry date that matters for the role, you can add 在留期間満了日
          (expiry) too. The <A href="/arubaito-resume">part-time template</A> has dedicated
          residence-status fields and will print the 週28時間以内 note automatically for students and
          dependents.
        </P>

        <H2>A few cautions</H2>
        <UL>
          <li>Never overstate your permission — it is easy for an employer to verify against the card.</li>
          <li>Keep the wording on the resume identical to your card to avoid confusion.</li>
          <li>
            This article is general information, not immigration advice — confirm specifics with the
            Immigration Services Agency. See our{" "}
            <A href="/disclaimer">disclaimer</A>.
          </li>
        </UL>
        <P>
          Ready to build it? Open the <A href="/editor">editor</A> and choose the part-time template
          to get the residence-status fields.
        </P>
      </>
    ),
  },
  {
    slug: "print-rirekisho-convenience-store",
    title: "How to Print Your Rirekisho at a Convenience Store (7-Eleven, FamilyMart, Lawson)",
    cardTitle: "Printing at a convenience store",
    description:
      "No printer? Print your resume PDF at any Japanese konbini. Step-by-step for 7-Eleven netprint and ネットワークプリント (FamilyMart/Lawson), with prices, paper sizes, and tips for the photo.",
    keywords: [
      "print rirekisho convenience store",
      "netprint 履歴書",
      "コンビニ 印刷 履歴書",
      "7-eleven print resume Japan",
      "ネットワークプリント 履歴書",
    ],
    date: "2026-06-21",
    readingTime: "5 min read",
    category: "Photo & printing",
    Body: () => (
      <>
        <P>
          Most part-time applicants — students and new arrivals — do not own a printer, and the job
          does not end at &ldquo;PDF downloaded.&rdquo; It ends with paper in the manager&apos;s hand.
          Every Japanese convenience store has a multicopy machine that prints from your phone for
          about ¥20–60 a page. Here is how.
        </P>

        <H2>Before you go</H2>
        <UL>
          <li>Export your resume as a PDF at the correct size (A4, or A3 for the folded JIS layout).</li>
          <li>Decide black-and-white (cheap) or colour (needed if your photo should print in colour).</li>
          <li>Have the relevant app or website ready on your phone.</li>
        </UL>

        <H2>7-Eleven — netprint</H2>
        <P>
          Use the netprint service (the &ldquo;かんたんnetprint&rdquo; app is easiest). Upload your
          PDF, and the app gives you a <strong>reservation number</strong>. At the store&apos;s
          multicopy machine, choose プリント → ネットプリント, enter the number, pick your settings,
          and pay. A4 black-and-white is about ¥20; colour about ¥60. A3 is supported for the folded
          rirekisho.
        </P>

        <H2>FamilyMart &amp; Lawson — ネットワークプリント</H2>
        <P>
          These chains use ネットワークプリント. Register your PDF through the app or website, get a
          user number or reservation number, then at the machine choose プリントサービス →
          ネットワークプリント and enter it. Pricing is similar to 7-Eleven.
        </P>

        <H2>Machine settings to choose</H2>
        <UL>
          <li>Paper size: A4 for most templates; A3 for the traditional fold-open (観音開き) layout.</li>
          <li>Colour: colour if your photo needs it, otherwise black-and-white to save money.</li>
          <li>Scale: 100% / actual size — never &ldquo;fit to page,&rdquo; which shrinks the form.</li>
          <li>Use the highest quality setting so the photo stays sharp.</li>
        </UL>

        <H2>Tips</H2>
        <UL>
          <li>
            ResumeJP exports at the exact paper size of your chosen template, so it prints to scale
            with no adjustment.
          </li>
          <li>Print one test copy and check the photo and text before printing several.</li>
          <li>
            Carry the finished sheet flat in a clear file inside a white A4 envelope — never folded
            into quarters.
          </li>
        </UL>
        <P>
          Get your photo right first with the{" "}
          <A href="/blog/rirekisho-photo-rules">rirekisho photo rules</A>, then build and export your
          sheet in the <A href="/editor">editor</A>.
        </P>
      </>
    ),
  },
  {
    slug: "japanese-era-dates-reiwa-resume",
    title: "Japanese Era vs Western Dates (令和 / 西暦) on Your Resume",
    cardTitle: "令和 vs Western dates",
    description:
      "Should you use 令和 or 2026 on your rirekisho? How the Japanese era calendar works, a quick conversion table, and the one rule that matters most: pick one system and use it everywhere.",
    keywords: [
      "令和 西暦 履歴書",
      "Japanese era dates resume",
      "Reiwa Heisei conversion",
      "履歴書 年号 書き方",
      "wareki seireki resume",
    ],
    date: "2026-06-21",
    readingTime: "4 min read",
    category: "Writing tips",
    Body: () => (
      <>
        <P>
          Japan uses two calendars side by side: the Western year (西暦, e.g. 2026) and the Japanese
          era year (和暦, e.g. 令和8). On a rirekisho you may use either — but mixing them is one of
          the most common and most noticeable mistakes. Here is how to keep it clean.
        </P>

        <H2>How the era calendar works</H2>
        <P>
          Each emperor&apos;s reign is an era that counts from year 1. The current era, 令和 (Reiwa),
          began in 2019, so Reiwa 1 = 2019, and the years line up like this:
        </P>
        <UL>
          <li>令和1 = 2019</li>
          <li>令和6 = 2024</li>
          <li>令和7 = 2025</li>
          <li>令和8 = 2026</li>
        </UL>
        <P>
          The previous era, 平成 (Heisei), ran 1989–2019, so many applicants&apos; birth and school
          dates fall in Heisei. Heisei 1 = 1989; to convert, add 1988 (e.g. Heisei 10 = 1998).
        </P>

        <H2>The one rule that matters</H2>
        <P>
          <strong>Pick one system and use it for every date on the resume</strong> — birth date,
          school entrance and graduation, jobs, and the &ldquo;as of&rdquo; date. A sheet that says
          you were born in 平成 but graduated in 2024 looks careless. There is no &ldquo;correct&rdquo;
          choice between them; consistency is what employers notice.
        </P>

        <H2>Which should a foreigner choose?</H2>
        <P>
          Western dates (西暦) are completely acceptable and usually easier for foreign applicants to
          keep accurate, since you already know your dates that way. Use 和暦 only if you are
          confident converting every date correctly. Whatever you choose, double-check your birth
          year and graduation years.
        </P>

        <H2>Let the tool handle it</H2>
        <P>
          ResumeJP keeps your date format consistent across the whole sheet automatically, so you
          cannot accidentally mix 令和 and 西暦. Pick your preference once and fill in the rest in the{" "}
          <A href="/editor">editor</A>. For the full set of fields, see the{" "}
          <A href="/guide/how-to-write-a-japanese-resume">rirekisho guide</A>.
        </P>
      </>
    ),
  },
  {
    slug: "email-rirekisho-japanese-etiquette",
    title: "How to Email Your Rirekisho in Japan (With a Template)",
    cardTitle: "Emailing your rirekisho",
    description:
      "Sending your resume by email? Japanese hiring has its own etiquette — subject line, greeting, attachment naming, and sign-off. A copy-paste Japanese email template with an English translation.",
    keywords: [
      "email rirekisho Japan",
      "履歴書 メール 送り方",
      "Japanese job email template",
      "send resume email Japanese etiquette",
      "応募 メール 例文",
    ],
    date: "2026-06-21",
    readingTime: "5 min read",
    category: "Applying",
    Body: () => (
      <>
        <P>
          Many part-time and full-time roles now ask you to email your rirekisho as a PDF. The email
          itself is part of the impression you make, and Japanese business email follows a clear
          pattern. Get it right and you look professional before anyone opens the attachment.
        </P>

        <H2>The essentials</H2>
        <UL>
          <li>
            <strong>Subject:</strong> state your purpose and name, e.g. 「アルバイト応募の件／○○○○」.
          </li>
          <li>
            <strong>Attachment:</strong> a PDF named clearly, such as 履歴書_氏名.pdf. Keep it under
            a few MB.
          </li>
          <li>
            <strong>Body:</strong> greeting, who you are, why you are writing, a mention of the
            attachment, and a polite close.
          </li>
          <li>
            <strong>Signature:</strong> your name, phone number, and email at the bottom.
          </li>
        </UL>

        <H2>Copy-paste template</H2>
        <P className="font-jp">
          件名：アルバイト応募の件／○○○○
          <br />
          <br />
          株式会社○○
          <br />
          採用ご担当者さま
          <br />
          <br />
          はじめまして。○○○○と申します。
          <br />
          このたび、貴店のアルバイト募集を拝見し、応募させていただきたくご連絡いたしました。
          <br />
          履歴書を添付いたしますので、ご確認のほどよろしくお願いいたします。
          <br />
          ご面接の機会をいただけますと幸いです。何卒よろしくお願い申し上げます。
          <br />
          <br />
          ──────────
          <br />
          氏名：○○○○
          <br />
          電話：090-0000-0000
          <br />
          メール：you@example.com
          <br />
          ──────────
        </P>

        <H2>English translation</H2>
        <P>
          (Subject: Re: part-time application / [Name]. &ldquo;Hello, my name is ___. I saw your
          part-time job posting and would like to apply. I have attached my resume; please take a
          look. I would be grateful for the chance of an interview. Thank you very much.&rdquo;
          Followed by your name, phone, and email.)
        </P>

        <H2>Small things that matter</H2>
        <UL>
          <li>Send from a sensible email address, not a joke handle.</li>
          <li>Send during business hours where you can.</li>
          <li>Attach a PDF, not a Word file or a photo of the paper.</li>
          <li>Re-read once for typos before sending — it signals care.</li>
        </UL>
        <P>
          Need the PDF to attach? Build it free in the <A href="/editor">editor</A>, and if it is a
          part-time role, start from the <A href="/arubaito-resume">part-time template</A>.
        </P>
      </>
    ),
  },
  {
    slug: "part-time-interview-questions-baito",
    title: "Part-Time Job Interview in Japan: Common Questions and How to Answer",
    cardTitle: "Part-time interview questions",
    description:
      "After your rirekisho comes the interview. The questions arubaito managers actually ask — availability, reason for applying, Japanese level — with honest, simple ways to answer in Japanese.",
    keywords: [
      "baito interview questions",
      "アルバイト 面接 質問",
      "part time interview Japan",
      "面接 答え方 例",
      "Japanese job interview foreigner",
    ],
    date: "2026-06-21",
    readingTime: "6 min read",
    category: "Applying",
    Body: () => (
      <>
        <P>
          A part-time interview in Japan is usually short, friendly, and practical. The manager
          mainly wants to know that you are reliable, available when they need you, and easy to work
          with. You do not need perfect Japanese — clear, honest answers in polite language go a long
          way. Here are the questions that come up almost every time.
        </P>

        <H2>&ldquo;When can you work?&rdquo; (シフト)</H2>
        <P>
          This is the most important question for arubaito. Know your real availability before you
          go, and answer concretely: 「平日は17時以降、土日は終日働けます。週4日希望です。」 Match
          what you wrote in your <A href="/arubaito-resume">shift grid</A>. If you are a student,
          be ready to mention the 28-hour limit.
        </P>

        <H2>&ldquo;Why did you apply here?&rdquo; (志望動機)</H2>
        <P>
          A short, honest reason is fine — proximity, interest in the work, wanting to improve your
          Japanese. 「家から近く、長く続けられると思い応募しました。」 If you prepared a written
          志望動機, just say it naturally rather than reciting it word for word.
        </P>

        <H2>&ldquo;How is your Japanese?&rdquo;</H2>
        <P>
          Answer plainly and positively: 「日常会話は問題ありません。難しい言葉はまだ勉強中です。」
          Honesty here builds trust; overstating it backfires on day one. See{" "}
          <A href="/blog/jlpt-levels-which-do-you-need">JLPT levels and what they mean</A>.
        </P>

        <H2>Other common questions</H2>
        <UL>
          <li>いつから働けますか — when can you start? Give a date.</li>
          <li>通勤時間は — how long is your commute? Closer is better for shift work.</li>
          <li>他にアルバイトをしていますか — do you have other jobs? (Relevant to the 28-hour limit.)</li>
          <li>長く続けられますか — can you stay long-term? Managers value continuity.</li>
        </UL>

        <H2>Etiquette on the day</H2>
        <UL>
          <li>Arrive 5–10 minutes early, dressed neatly and conservatively.</li>
          <li>Bring your printed rirekisho in a clear file inside a white envelope, even if you emailed it.</li>
          <li>Greet with 「本日はよろしくお願いいたします」 and close with 「ありがとうございました」.</li>
          <li>Turn your phone off, not just silent.</li>
        </UL>
        <P>
          Walk in prepared by getting the resume right first — build it in the{" "}
          <A href="/editor">editor</A>, and if you have not applied yet, our{" "}
          <A href="/blog/phone-script-after-applying-baito">phone script</A> covers the call before
          the interview.
        </P>
      </>
    ),
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug);
}
