import express from 'express';
import PDFDocument from 'pdfkit';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle, Table, TableRow, TableCell, WidthType } from 'docx';

const router = express.Router();

// ── Resume Data ───────────────────────────────────────────────────────────
const resume = {
  name: 'Aryan Gupta',
  title: 'Full Stack Developer',
  email: 'aryan.gupta9352@gmail.com',
  phone: '+91-XXXXXXXXXX',
  location: 'Jaipur, Rajasthan',
  linkedin: 'linkedin.com/in/aryan-gupta-a161b4314',
  github: 'github.com/aryangupta92',
  summary: 'Passionate Full Stack Developer and B.Tech CS student at JK Lakshmipat University, Jaipur. Skilled in building modern web applications using the MERN stack with a strong focus on UI/UX design and problem solving.',
  skills: {
    'Frontend': ['React.js (60%)', 'HTML5', 'CSS3', 'JavaScript'],
    'Backend': ['Node.js (60%)', 'Express.js (65%)'],
    'Database': ['MongoDB (65%)'],
    'Languages': ['Python (70%)', 'JavaScript'],
    'Design': ['Figma (75%)', 'UI/UX Design'],
  },
  education: [
    { degree: 'B.Tech in Computer Science', institution: 'JK Lakshmipat University, Jaipur', year: '2022 – Present' },
  ],
  experience: [
    { role: 'Full Stack Developer (Personal Projects)', company: 'Freelance / Self-Development', duration: '1 Year', description: 'Built 5 full-stack projects covering AI/ML, web development, and data science. Focused on MERN stack development with strong UI/UX principles.' },
  ],
  projects: [
    { name: 'Train Delay Prediction Model', tech: 'Python, Scikit-learn, Pandas', desc: 'AI/ML model predicting train delays for Rajasthan cities using regression algorithms.' },
    { name: 'Indian Stock Market Volatility Model', tech: 'Python, NumPy, Pandas', desc: 'Built a new volatility prediction model for the Indian stock market using advanced statistical concepts.' },
    { name: 'Portfolio Website', tech: 'React.js, Node.js, Express.js, MongoDB', desc: 'Full Stack MERN portfolio with 3D animations, contact form with database storage, deployed on Vercel + Render.' },
    { name: 'Crop Yield Prediction', tech: 'Python, Machine Learning', desc: 'Agricultural ML model predicting crop yields based on soil and climate data.' },
    { name: 'Personal Finance Tracker', tech: 'React.js, Node.js, MongoDB', desc: 'MERN stack finance management app with income/expense tracking and visualization.' },
  ],
  languages: ['Hindi (Native)', 'English (Professional)', 'French (Beginner)'],
};

// ══════════════════════════════════════════════════════
// GET /api/download/pdf  — generate and stream resume PDF
// ══════════════════════════════════════════════════════
router.get('/pdf', (req, res) => {
  const doc = new PDFDocument({ margin: 50, size: 'A4' });

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="Aryan_Gupta_Resume.pdf"');
  doc.pipe(res);

  const primaryColor = '#6366f1';
  const darkColor = '#1e1e2e';
  const grayColor = '#6b7280';
  const pageWidth = 515;

  // ── Header ─────────────────────────────────────────
  doc.rect(0, 0, 612, 110).fill(darkColor);
  doc.fillColor('#ffffff').fontSize(26).font('Helvetica-Bold')
     .text(resume.name, 50, 30);
  doc.fillColor(primaryColor).fontSize(13).font('Helvetica')
     .text(resume.title, 50, 62);
  doc.fillColor('#cccccc').fontSize(9)
     .text(`${resume.email}  |  ${resume.location}  |  ${resume.github}  |  ${resume.linkedin}`, 50, 84);

  doc.y = 126;
  doc.fillColor(darkColor);

  const section = (title) => {
    doc.moveDown(0.4);
    doc.fillColor(primaryColor).fontSize(11).font('Helvetica-Bold').text(title.toUpperCase());
    doc.moveTo(50, doc.y + 3).lineTo(562, doc.y + 3).stroke(primaryColor);
    doc.moveDown(0.4);
    doc.fillColor(darkColor).fontSize(9.5).font('Helvetica');
  };

  // ── Summary ────────────────────────────────────────
  section('Professional Summary');
  doc.text(resume.summary, { width: pageWidth });

  // ── Skills ────────────────────────────────────────
  section('Skills');
  Object.entries(resume.skills).forEach(([cat, items]) => {
    doc.font('Helvetica-Bold').text(`${cat}: `, { continued: true });
    doc.font('Helvetica').text(items.join(', '));
  });

  // ── Education ─────────────────────────────────────
  section('Education');
  resume.education.forEach(e => {
    doc.font('Helvetica-Bold').text(e.degree, { continued: true });
    doc.font('Helvetica').fillColor(grayColor).text(`  —  ${e.year}`);
    doc.fillColor(darkColor).text(e.institution);
    doc.moveDown(0.2);
  });

  // ── Experience ─────────────────────────────────────
  section('Experience');
  resume.experience.forEach(e => {
    doc.font('Helvetica-Bold').fillColor(darkColor).text(e.role);
    doc.font('Helvetica').fillColor(grayColor).text(`${e.company}  |  ${e.duration}`);
    doc.fillColor(darkColor).text(e.description);
    doc.moveDown(0.2);
  });

  // ── Projects ─────────────────────────────────────
  section('Projects');
  resume.projects.forEach(p => {
    doc.font('Helvetica-Bold').fillColor(darkColor).text(p.name, { continued: true });
    doc.font('Helvetica').fillColor(grayColor).text(`  —  ${p.tech}`);
    doc.fillColor(darkColor).text(p.desc);
    doc.moveDown(0.2);
  });

  // ── Languages ─────────────────────────────────────
  section('Languages');
  doc.font('Helvetica').fillColor(darkColor).text(resume.languages.join('   •   '));

  doc.end();
});

// ══════════════════════════════════════════════════════
// GET /api/download/docx  — generate and stream resume DOCX
// ══════════════════════════════════════════════════════
router.get('/docx', async (req, res) => {
  const sectionTitle = (text) => new Paragraph({
    text,
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 300, after: 80 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: '6366f1' } },
  });

  const bullet = (text) => new Paragraph({
    text: `• ${text}`,
    spacing: { after: 40 },
    indent: { left: 200 },
  });

  const doc = new Document({
    styles: {
      default: {
        document: { run: { font: 'Calibri', size: 22 } },
      },
    },
    sections: [{
      properties: {},
      children: [
        // Name
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: resume.name, bold: true, size: 48, color: '6366f1' })],
          spacing: { after: 40 },
        }),
        // Title
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: resume.title, size: 28, color: '374151' })],
          spacing: { after: 40 },
        }),
        // Contact
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: `${resume.email}  |  ${resume.location}  |  ${resume.github}`, size: 18, color: '6b7280' })],
          spacing: { after: 200 },
        }),

        // Summary
        sectionTitle('Professional Summary'),
        new Paragraph({ text: resume.summary, spacing: { after: 100 } }),

        // Skills
        sectionTitle('Skills'),
        ...Object.entries(resume.skills).map(([cat, items]) =>
          new Paragraph({
            children: [
              new TextRun({ text: `${cat}: `, bold: true }),
              new TextRun({ text: items.join(', ') }),
            ],
            spacing: { after: 60 },
          })
        ),

        // Education
        sectionTitle('Education'),
        ...resume.education.flatMap(e => [
          new Paragraph({
            children: [
              new TextRun({ text: e.degree, bold: true }),
              new TextRun({ text: `  —  ${e.year}`, color: '6b7280' }),
            ],
            spacing: { after: 40 },
          }),
          new Paragraph({ text: e.institution, spacing: { after: 100 } }),
        ]),

        // Experience
        sectionTitle('Experience'),
        ...resume.experience.flatMap(e => [
          new Paragraph({ children: [new TextRun({ text: e.role, bold: true })], spacing: { after: 40 } }),
          new Paragraph({ children: [new TextRun({ text: `${e.company}  |  ${e.duration}`, color: '6b7280', italics: true })], spacing: { after: 40 } }),
          new Paragraph({ text: e.description, spacing: { after: 120 } }),
        ]),

        // Projects
        sectionTitle('Projects'),
        ...resume.projects.flatMap(p => [
          new Paragraph({
            children: [
              new TextRun({ text: p.name, bold: true }),
              new TextRun({ text: `  —  ${p.tech}`, color: '6b7280', italics: true }),
            ],
            spacing: { after: 40 },
          }),
          new Paragraph({ text: p.desc, spacing: { after: 100 } }),
        ]),

        // Languages
        sectionTitle('Languages'),
        new Paragraph({ text: resume.languages.join('   •   ') }),
      ],
    }],
  });

  const buffer = await Packer.toBuffer(doc);
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
  res.setHeader('Content-Disposition', 'attachment; filename="Aryan_Gupta_Resume.docx"');
  res.setHeader('Content-Length', buffer.length);
  res.send(buffer);
});

export default router;
