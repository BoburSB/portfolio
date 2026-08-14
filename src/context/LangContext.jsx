import { createContext, useContext, useState } from 'react';

const ctx = createContext(null);

export const t = {
  uz: {
    // Navbar
    nav_home: "Bosh sahifa", nav_about: "Haqimda", nav_work: "Ishlar",
    nav_skills: "Ko'nikmalar", nav_xp: "Tajriba", nav_contact: "Bog'lanish",
    nav_cta: "Bog'lanish",

    // Hero
    hero_role: "Middle Frontend Developer & UI/UX Designer",
    hero_desc: "Zamonaviy, tezkor va foydalanuvchiga qulay web interfeyslar yaratuvchi mutaxassis. React ekotizimi va Figma bilan ishlayman.",
    hero_btn1: "Ishlarimni ko'r",
    hero_btn2: "Telegram",
    hero_s1: "Loyihalar", hero_s2: "Yil tajriba", hero_s3: "Texnologiya",
    hero_stack: "Stack", hero_status: "Mavjud",

    // About
    about_label: "01 — Haqimda",
    about_h: "Kod yozish —\nfaqat hunarm emas,\ntilim.",
    about_p1: "Men — Sodiqov Bobur. Toshkent shahridagi middle frontend developer va UI/UX designer. React, TypeScript va Figma bilan ishlashda 2 yildan ortiq tajribam bor.",
    about_p2: "Har bir loyihamda foydalanuvchi tajribasini (UX) kod sifati bilan birga ko'taraman. Chiroyli ko'rinishi va tez ishlashi — ikkalasi bir vaqtda mumkin.",
    about_n1: "Loyihalar", about_n2: "Yil", about_n3: "Qiziqish",
    about_role_tag: "Developer",

    // Work
    work_label: "02 — Ishlar",
    work_h: "Tanlangan loyihalar",
    work_col1: "Loyiha", work_col2: "Yil",
    work_desc1: "Kodni real-time tahlil qilib, xatolarni aniqlash va yaxshilash tavsiyalari beruvchi ilova.",
    work_desc2: "Ustalar va mijozlarni real-time booking orqali bog'lovchi platforma.",
    work_desc3: "Ingliz tili darajasini aniqlash va progress kuzatish platformasi.",
    work_desc4: "Xodimlar davomatini boshqarish uchun real-time statistikali CRM.",

    // Skills
    skills_label: "03 — Ko'nikmalar",
    skills_h1: "Texnologiyalar",
    skills_h2: "Xizmatlar",
    svc1_t: "Frontend Development", svc1_d: "React, TypeScript, Tailwind — toza va tezkor kod.",
    svc2_t: "UI/UX Design",         svc2_d: "Figma, prototiplash, dizayn tizimlarini yaratish.",
    svc3_t: "Landing Pages",         svc3_d: "Yuqori konversiyali, tezkor, premium landinglar.",
    svc4_t: "Web Applications",      svc4_d: "CRM, SaaS, murakkab interaktiv web ilovalar.",

    // Experience
    xp_label: "04 — Tajriba",
    xp_h: "Karyera yo'li",
    xp_now: "Hozir",
    xp_city: "Toshkent, O'zbekiston",
    xp1_r: "Middle Frontend Developer", xp1_c: "Freelance / Remote",
    xp1_d: "React, TypeScript va zamonaviy texnologiyalar yordamida murakkab web ilovalar ishlab chiqish. Dizayndan to deployment gacha to'liq jarayon.",
    xp2_r: "UI/UX Designer & Frontend Developer", xp2_c: "UstaBor Platform",
    xp2_d: "Foydalanuvchi interfeyslarini dizayn qilish va frontend qismini ishlab chiqish. Figma prototiplaridan React componentlariga o'tish.",
    xp3_r: "Junior Frontend Developer", xp3_c: "English Test Platform",
    xp3_d: "Birinchi professional loyihalar. HTML, CSS va JavaScript asoslarini real loyihalarda qo'llash.",

    // Numbers
    nums_label: "— Raqamlarda",
    nums_h: "Natijalar gapirar",

    // Process
    proc_label: "05 — Jarayon",
    proc_h: "Qanday ishlayman",
    proc1_t: "Tahlil", proc1_d: "Loyiha maqsadlari, auditoriya va texnik talablarni chuqur o'rganaman.",
    proc2_t: "Dizayn", proc2_d: "Figmada wireframe va high-fidelity prototip yasayman. Har pixel o'z o'rnida.",
    proc3_t: "Ishlab chiqish", proc3_d: "React, TypeScript va clean code printsiplari bilan frontend quriladi.",
    proc4_t: "Test & Deploy", proc4_d: "Cross-browser test, performance optimallashtirish va deployment.",

    // FAQ
    faq_label: "06 — F.A.Q",
    faq_h: "Ko'p beriladigan\nsavollar",
    faq_q1: "Qanday texnologiyalardan foydalanasiz?",
    faq_a1: "Asosan React, TypeScript, Tailwind CSS va Framer Motion kabi zamonaviy frontend texnologiyalari yordamida interfeyslar yarataman.",
    faq_q2: "Loyihani qancha vaqtda bitirasiz?",
    faq_a2: "Loyiha hajmi va murakkabligiga qarab farq qiladi. Landing sahifalar 3-5 kun, murakkab web ilovalar 2-4 hafta vaqt olishi mumkin.",
    faq_q3: "Faqat frontend qilasizmi yoki backend hammi?",
    faq_a3: "Men asosan Frontend va UI/UX dizayniga ixtisoslashganman. Lekin REST API va Firebase bilan ham mustahkam ishlay olaman.",
    faq_q4: "Dizayn yo'q bo'lsa ham ishlay olasizmi?",
    faq_a4: "Albatta. UI/UX dizayner sifatida avval loyihangiz uchun Figma'da to'liq prototip tayyorlab, keyin dasturlashni boshlashim mumkin.",

    // Contact
    contact_label: "07 — Bog'lanish",
    contact_h: "Birgalikda\nkatta narsalar\nyaratamiz.",
    contact_p: "Yangi g'oya, startup yoki web loyiha ustida ishlamoqchi bo'lsangiz — bog'laning. Bir necha soat ichida javob beraman.",
    contact_email: "Email", contact_tg: "Telegram", contact_loc: "Manzil",
    contact_loc_v: "Toshkent, O'zbekiston",
    form_h: "Xabar yuborish", form_name: "Ismingiz", form_email: "Email",
    form_msg: "Xabaringiz", form_ph_name: "Ism Familiya", form_ph_msg: "Loyiha haqida...",
    form_btn: "Yuborish", form_busy: "Yuborilmoqda", form_ok: "Xabar yuborildi",
    form_ok2: "Tez orada javob beraman.", form_again: "Yana yuborish →",
    footer_copy: "Barcha huquqlar himoyalangan",
  },
  en: {
    nav_home: "Home", nav_about: "About", nav_work: "Work",
    nav_skills: "Skills", nav_xp: "Experience", nav_faq: "FAQ", nav_contact: "Contact",
    nav_cta: "Contact Me",

    hero_role: "Middle Frontend Developer & UI/UX Designer",
    hero_desc: "A specialist who creates modern, fast and user-friendly web interfaces. I work with the React ecosystem and Figma.",
    hero_btn1: "See my work",
    hero_btn2: "Telegram",
    hero_s1: "Projects", hero_s2: "Years exp.", hero_s3: "Technologies",
    hero_stack: "Stack", hero_status: "Available",

    about_label: "01 — About",
    about_h: "Writing code —\nnot just a craft,\na language.",
    about_p1: "I'm Sodiqov Bobur — a middle frontend developer and UI/UX designer based in Tashkent. 2+ years of professional experience with React, TypeScript and Figma.",
    about_p2: "In every project, I elevate user experience together with code quality. Beautiful appearance and fast performance — both at the same time.",
    about_n1: "Projects", about_n2: "Years", about_n3: "Passion",
    about_role_tag: "Developer",

    work_label: "02 — Work",
    work_h: "Selected Projects",
    work_col1: "Project", work_col2: "Year",
    work_desc1: "A web application that analyzes code in real-time, detects errors and provides improvement suggestions.",
    work_desc2: "A platform connecting service masters and clients through real-time booking.",
    work_desc3: "An English language proficiency testing and progress tracking platform.",
    work_desc4: "A modern CRM system with real-time statistics for managing employee attendance.",

    skills_label: "03 — Skills",
    skills_h1: "Technologies",
    skills_h2: "Services",
    svc1_t: "Frontend Development", svc1_d: "React, TypeScript, Tailwind — clean and fast code.",
    svc2_t: "UI/UX Design",         svc2_d: "Figma, prototyping, creating design systems.",
    svc3_t: "Landing Pages",         svc3_d: "High-conversion, fast, premium landing pages.",
    svc4_t: "Web Applications",      svc4_d: "CRM, SaaS, complex interactive web applications.",

    xp_label: "04 — Experience",
    xp_h: "Career Path",
    xp_now: "Now",
    xp_city: "Tashkent, Uzbekistan",
    xp1_r: "Middle Frontend Developer", xp1_c: "Freelance / Remote",
    xp1_d: "Developing complex web applications using React, TypeScript and modern technologies. Full process from design to deployment.",
    xp2_r: "UI/UX Designer & Frontend Developer", xp2_c: "UstaBor Platform",
    xp2_d: "Designing user interfaces and developing the frontend. Transitioning from Figma prototypes to React components.",
    xp3_r: "Junior Frontend Developer", xp3_c: "English Test Platform",
    xp3_d: "First professional projects. Applying HTML, CSS and JavaScript fundamentals in real projects.",

    nums_label: "— In Numbers",
    nums_h: "Results speak.",

    proc_label: "05 — Process",
    proc_h: "How I work",
    proc1_t: "Discovery", proc1_d: "Deep dive into project goals, audience and technical requirements.",
    proc2_t: "Design", proc2_d: "Wireframes and high-fidelity prototypes in Figma. Every pixel in place.",
    proc3_t: "Development", proc3_d: "Frontend built with React, TypeScript and clean code principles.",
    proc4_t: "Test & Deploy", proc4_d: "Cross-browser testing, performance optimization and deployment.",

    // FAQ
    faq_label: "06 — F.A.Q",
    faq_h: "Frequently\nasked questions",
    faq_q1: "What technologies do you use?",
    faq_a1: "I build interfaces primarily using modern frontend technologies like React, TypeScript, Tailwind CSS, and Framer Motion.",
    faq_q2: "How long does a project take?",
    faq_a2: "It depends on the scope and complexity. Landing pages might take 3-5 days, while complex web applications can take 2-4 weeks.",
    faq_q3: "Do you only do frontend or backend too?",
    faq_a3: "I specialize mostly in Frontend and UI/UX design. However, I can effectively work with REST APIs and Firebase.",
    faq_q4: "Can you work without an existing design?",
    faq_a4: "Absolutely. As a UI/UX designer, I can first prepare a complete prototype for your project in Figma, and then begin development.",

    contact_label: "07 — Contact",
    contact_h: "Let's create\nbig things\ntogether.",
    contact_p: "If you want to work on a new idea, startup or web project — reach out. I'll respond within a few hours.",
    contact_email: "Email", contact_tg: "Telegram", contact_loc: "Location",
    contact_loc_v: "Tashkent, Uzbekistan",
    form_h: "Send a message", form_name: "Your Name", form_email: "Email",
    form_msg: "Your Message", form_ph_name: "Full Name", form_ph_msg: "About the project...",
    form_btn: "Send", form_busy: "Sending", form_ok: "Message sent",
    form_ok2: "I'll respond soon.", form_again: "Send again →",
    footer_copy: "All rights reserved",
  },
};

export function LangProvider({ children }) {
  const [lang, setLang] = useState('uz');
  return <ctx.Provider value={{ lang, setLang, T: t[lang] }}>{children}</ctx.Provider>;
}

export function useLang() { return useContext(ctx); }
