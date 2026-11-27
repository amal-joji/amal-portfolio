# AMAL JOJI — PREMIUM SOFTWARE ENGINEER & AI ENGINEER PORTFOLIO

> A high-performance, dark-mode personal developer portfolio inspired by the **Razorpay Buildathon** visual design language, built with React, Vite, Tailwind CSS, Framer Motion, and Lucide Icons.

---

## ⚡ Quick Start (Run Locally)

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) (v18 or higher recommended) installed.

### 2. Installation
Open your terminal in this directory and install all dependencies:
```bash
npm install
```

### 3. Run Development Server
Start the local Vite development server:
```bash
npm run dev
```
Open your browser and navigate to:
**[http://localhost:5173](http://localhost:5173)**

### 4. Build for Production
To create an optimized production build:
```bash
npm run build
```
To preview the production build locally:
```bash
npm run preview
```

---

## 📂 Project Structure

```
Portfolio/
├── index.html                  # Main entry HTML with Google Inter font
├── package.json                # Project dependencies and npm scripts
├── postcss.config.cjs          # PostCSS configuration for Tailwind CSS
├── tailwind.config.cjs         # Custom dark theme, colors, fonts, and spacing
├── vite.config.js              # Vite configuration with React plugin
├── public/
│   └── resume.pdf              # Resume PDF download asset (configured path)
└── src/
    ├── main.jsx                # React root mount
    ├── App.jsx                 # Main application layout & section flow
    ├── styles/
    │   └── globals.css         # Global Tailwind directives & dark theme styles
    ├── data/                   # Centralized editable data files
    │   ├── profile.js          # Personal branding, headline, bio, education, socials
    │   ├── experiences.js      # JPMorgan Chase Code for Good & other experiences
    │   ├── projects.js         # The 4 highlighted projects & technical telemetry
    │   ├── skills.js           # Technical skill categories & tools
    │   └── achievements.js     # Honors, hackathon medals, and NPTEL certifications
    └── components/
        ├── Navbar.jsx          # Fixed navigation with brand, links, and mobile menu
        ├── ScrollProgress.jsx  # Razorpay-style top scroll progress indicator
        ├── Hero.jsx            # Impactful opening section with typography & telemetry
        ├── SectionHeading.jsx  # Large numbered editorial section headings
        ├── About.jsx           # Section 01: Narrative bio & academic credentials card
        ├── Experience.jsx      # Section 02: JPMorgan Chase Code for Good showcase
        ├── Projects.jsx        # Section 03: Selected projects showcase
        ├── ProjectCard.jsx     # Individual project card with implementation highlights
        ├── ProjectVisuals.jsx  # Custom SVG telemetry graphics (Ocean, Parking, NLP, Game)
        ├── Skills.jsx          # Section 04: Interactive categorized technical skills grid
        ├── Achievements.jsx    # Section 05: Honors, certifications, and medals
        ├── BeyondCode.jsx      # Section 06: Emerging AI & system design interests
        ├── Contact.jsx         # Section 07: Copyable email, social links, and resume CTA
        └── Footer.jsx          # Personal branding, copyright, and back-to-top button
```

---

## 🎨 Design System Highlights (Razorpay Buildathon Aesthetic)

- **Theme**: Obsidian / Dark Premium (`#0a0a0f`, `#0f0f17`, `#14141f`)
- **Accents**: Vibrant electric purple (`#6c5ce7`, `#a29bfe`) and glowing cyan (`#00cec9`)
- **Typography**: Oversized high-contrast headings with tight letter-spacing (`font-black tracking-[-0.03em]`) and monospace telemetry sub-labels
- **Visuals**: Bespoke interactive graphics for each project (satellite ocean radar, sensor hotspot matrix, NLP attention visualizer, and 2D vector game HUD) rather than generic emojis or stock photos
- **Motion**: Framer Motion scroll-triggered reveals with smooth viewport entry

---

## 📄 Managing Your Resume

1. Place your updated resume file in the `public/` folder as `resume.pdf`:
   ```
   public/resume.pdf
   ```
2. The portfolio is pre-configured to link directly to `/resume.pdf`. When visitors click **Download Resume** in the Hero, Navbar, or Contact sections, it downloads automatically.
3. If you want to rename your resume file or change its path, simply update the `resumePath` key in `src/data/profile.js`.

---

## ✏️ Customizing Your Data & Placeholders

All personal and technical content is isolated in `src/data/` for easy editing:

| File | What to update |
|---|---|
| `src/data/profile.js` | Bio, graduation year, CGPA, email, and social profiles |
| `src/data/experiences.js` | Add team project details, dates, or tech stack for Code for Good |
| `src/data/projects.js` | Update GitHub repository URLs or add live deployment links |
| `src/data/skills.js` | Add or re-group programming languages, libraries, and tools |
| `src/data/achievements.js` | Add new hackathons, rankings, or certifications |

---

## 🚀 Deploying to Vercel

### Option 1: Via GitHub (Recommended)
1. Initialize a git repository and commit your files:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Amal Joji portfolio"
   ```
2. Push your repository to GitHub:
   ```bash
   git remote add origin https://github.com/amal-joji/portfolio.git
   git branch -M main
   git push -u origin main
   ```
3. Go to [vercel.com](https://vercel.com/) and click **Add New Project**.
4. Import your GitHub repository.
5. Vercel automatically detects **Vite**:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
6. Click **Deploy**. Your portfolio will be live in under a minute!

### Option 2: Via Vercel CLI
```bash
npm install -g vercel
vercel
```
Follow the interactive prompts and select default options.
