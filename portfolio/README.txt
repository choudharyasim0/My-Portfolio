PORTFOLIO — FOLDER GUIDE
=========================

portfolio/
├── index.html          → main page (open this in a browser)
├── css/style.css        → all styling
├── js/script.js         → all interactivity (typing effect, animated background, nav, lightbox)
├── images/
│   ├── hero.jpg                       → Home section photo
│   ├── about.jpg                      → About section photo
│   ├── contact.jpg                    → Contact section photo
│   ├── cert-cisco-iot.jpg             → Cisco — Intro to IoT certificate
│   ├── cert-developershub.jpg         → DevelopersHub AI/ML internship certificate
│   ├── cert-hp-datascience.jpg        → HP LIFE — Data Science & Analytics
│   ├── cert-hp-leadership.jpg         → HP LIFE — Effective Leadership
│   └── cert-hp-criticalthinking.jpg   → HP LIFE — Critical Thinking in the AI Era
└── README.txt           → this file

HOW TO CUSTOMIZE
----------------
1. Resume: add your resume PDF into this same folder and name it "resume.pdf"
   (the Download Resume button in the Contact section already links to it).

2. Certificates: click any certificate thumbnail on the live site to preview
   it full-size. To add more certificates, copy one .cert-card block in
   index.html (search for "cert-grid"), point data-src/img src at your new
   image in images/, and update the title/issuer/date text.

3. Photos: replace any file in images/ with your own (keep the same
   filename, or update the matching src path in index.html).

4. Project/GitHub links: search index.html for "github.com/choudharyasim0"
   and swap in a specific repo link for any project that has its own repo.

HOSTING
-------
Everything is linked with relative paths, so you can upload this whole
folder as-is to GitHub Pages, Netlify, Vercel, or any static host — no
build step required.
