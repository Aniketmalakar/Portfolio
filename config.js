// =====================================================================
//  YOUR SITE SETTINGS — edit this file to change links, projects & music.
//  You can edit it straight on GitHub (open the file → pencil icon → Commit).
//  Keep the quotes and commas exactly like the examples.
// =====================================================================

window.SITE = {

  // ---- Links used in the nav, menu and footer ----
  links: {
    resume: "https://drive.google.com/drive/folders/1gO5KZx9bh9LnygRj1AiOOcVQ9HC2dY6h?usp=sharing",                                   // upload your resume as resume.pdf next to index.html, or paste a Google Drive link
    linkedin: "https://www.linkedin.com/in/aniket-malakar2//",  // ← your LinkedIn URL
    instagram: "https://www.instagram.com/_mr_malakar/",    // ← your Instagram URL
    email: "aniketmalakar19@gmail.com",                          // ← your email
  },

  // Small badge in the hero
  visitorsText: "Welcome aboard",

  // ---- Selected work (main projects) ----
  // link   = where "Open case study" goes (Behance, Notion, Figma, a PDF in this folder, etc.)
  // cover  = an image in images/work/ (leave "" to show the placeholder phones)
  // featured: true makes the card twice as wide on desktop (use it for your best project)
  // category = used for the filter buttons (e.g. "Mobility", "Product", "Packaging")
  work: [
    { name: "[Rider app redesign]", company: "WTi Cabs", role: "UI/UX Designer", type: "Mobility · App",
      when: "Oct 2025 — now", impact: "[+x% bookings]", tags: ["App", "Live"], category: "Mobility",
      featured: true, link: "", cover: "", avatarColor: "#1f6feb" },
    { name: "[Driver partner app]", company: "WTi Cabs", role: "UI/UX Designer", type: "Mobility · App",
      when: "2025", impact: "[metric]", tags: ["App"], category: "Mobility",
      link: "", cover: "", avatarColor: "#1f6feb" },
    { name: "[Home decor storefront]", company: "Fig Living", role: "UI/UX Design Intern", type: "Product · Web",
      when: "Jan — May 2024", impact: "[metric]", tags: ["Web"], category: "Product",
      link: "", cover: "", avatarColor: "#6b4fa0" },
    { name: "[Packaging series]", company: "Think CMYK", role: "Packaging Design Intern", type: "Packaging · Print",
      when: "Jun — Jul 2023", impact: "[n SKUs]", tags: ["Print"], category: "Packaging",
      link: "", cover: "", avatarColor: "#c4006a" },
    { name: "[Graduation project]", company: "NIFT Delhi", role: "Design student", type: "Product · Research",
      when: "2025", impact: "[outcome]", tags: ["Research"], category: "Product",
      link: "", cover: "", avatarColor: "#b5452a" },
  ],
  workNote: "some work is under NDA — happy to walk you through it on a call.",

  // ---- Side projects (vibe-coded) — delete everything inside [ ] to hide this section ----
  sideProjects: [
    { name: "[Side project one]", url: "[project-one].vercel.app", link: "", desc: "[One line on what it does and who it is for]",
      prompt: "'[what you asked the AI]'", stack: "[Claude + Cursor]", tags: ["Claude", "Cursor"] },
  ],

  // ---- Toolkit icons (images/toolkit/) ----
  tools: [
    { name: "Figma", what: "Core UI, systems & tokens", icon: "images/toolkit/01-figma.png" },
    { name: "Claude", what: "Vibe coding & logic architecture", icon: "images/toolkit/02-claude.png" },
    { name: "ChatGPT", what: "Ideation & AI co-piloting (with Stitch)", icon: "images/toolkit/03-chatgpt.png" },
    { name: "Rive", what: "Interactive runtime animations", icon: "images/toolkit/04-rive.png" },
    { name: "Framer", what: "Interactive web & production", icon: "images/toolkit/05-framer.png" },
    { name: "Illustrator", what: "Vector systems & iconography", icon: "images/toolkit/06-illustrator.png" },
    { name: "Photoshop", what: "Visual design & asset polish", icon: "images/toolkit/07-photoshop.png" },
    { name: "After Effects", what: "Micro-interactions & motion specs", icon: "images/toolkit/08-after-effects.png" },
    { name: "Lightroom", what: "Visual grading & video (with Premiere)", icon: "images/toolkit/09-lightroom.png" },
  ],

  // ---- Music player (YouTube playlists). Delete everything inside [ ] to hide it ----
  // Paste the FULL playlist link (Share → Copy link). The playlist must be Public or Unlisted.
  musicLabel: "Ride mix on the hill",
  music: [
    { name: "Ride mix", playlist: "https://music.youtube.com/playlist?list=PLWq0p6rEpaWw",
      firstSong: "https://music.youtube.com/watch?v=8PZ7qw2F9h4", color: "#e11d48" },
  ],

  // ---- Polaroids on the desk (put photos in images/desk/) ----
  desk: {
    photo1: "images/desk/Triund,2025.jpeg", caption1: "[Triund trek,2025r]",
    photo2: "", caption2: "[place, year]",
  },
};
