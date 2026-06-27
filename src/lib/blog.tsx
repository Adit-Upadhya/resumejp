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
const P = ({ children }: { children: ReactNode }) => (
  <p className="mt-4 text-[0.95rem] sm:text-[1.03rem] leading-[1.8]">{children}</p>
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
];

export function getPost(slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug);
}
