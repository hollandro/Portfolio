import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import myImage from "./assets/me.png";
import "./index.css";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Sequence {
  text: string;
  pause: number;
}

interface Shoe {
  id: number;
  name: string;
  year: string;
  colorway: string;
  notes: string;
  image: string;
}

interface Project {
  id: number;
  name: string;
  description: string;
  tech: string[];
  github?: string;
  live?: string;
}




// ─── Typing animation hook ───────────────────────────────────────────────────
function useTypingAnimation(sequences: Sequence[]) {
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const seq = sequences[phase];
    if (!seq) return;
    const { text, pause } = seq;
    const i = displayed.length;
    if (i < text.length) {
      const t = setTimeout(() => setDisplayed(text.slice(0, i + 1)), 38);
      return () => clearTimeout(t);
    } else {
      if (phase < sequences.length - 1) {
        const t = setTimeout(() => {
          setPhase((p) => p + 1);
          setDisplayed(text);
        }, pause || 1200);
        return () => clearTimeout(t);
      }
    }
  }, [displayed, phase, sequences]);

  return displayed;
}








// ─── Nav ──────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="nav__brand">
        <NavLink to="/" end className={({ isActive }) => isActive ? "nav__link nav__link--active" : "nav__link"}><span className="nav__name">R.H</span></NavLink>
      </div>
      <div className="nav__links">
        <NavLink to="/projects" className={({ isActive }) => isActive ? "nav__link nav__link--active" : "nav__link"}>Projects</NavLink>
        {/* <NavLink to="/collection" className={({ isActive }) => isActive ? "nav__link nav__link--active" : "nav__link"}>Collection</NavLink> */}
        <NavLink to="/contact" className={({ isActive }) => isActive ? "nav__link nav__link--active" : "nav__link"}>Contact</NavLink>
      </div>
    </nav>
  );
}





// ─── Home ─────────────────────────────────────────────────────────────────────
const SEQUENCES: Sequence[] = [
  { text: "Hi!", pause: 900 },
  { text: "Hi! My name is Rochelle Holland.", pause: 1200 },
  { text: "Hi! My name is Rochelle Holland.\n\nI'm currently a junior at University of Colorado majoring in Computer Science.", pause: 1400 },
  { text: "Hi! My name is Rochelle Holland.\n\nI'm currently a junior at University of Colorado majoring in Computer Science.\n\nThis website is a portfolio and also a place I can share my work.", pause: 99999 },
];

function Home() {
  const text = useTypingAnimation(SEQUENCES);

  return (
    <main className="home">
      <div className="home__text">
        <p className="home__typing">
          {text.split("\n\n").map((paragraph, i) => (
            <span key={i} className="typing__paragraph">{paragraph}</span>
          ))}
          <span className="cursor">|</span>
        </p>
        <div className="home__tags">
          <span className="tag">Computer Science</span>
          <span className="tag">University of Colorado</span>
          <span className="tag">Developer</span>
        </div>
      </div>
      <div className="home__photo">
        <div className="photo-frame">
          <img src={myImage} alt="Rochelle Holland" className="photo-img" />
        </div>
        <p className="photo-caption">Rochelle Holland · Denver, CO</p>
      </div>
    </main>
  );
}








// ─── Shoe Collection ──────────────────────────────────────────────────────────
const proxy = (url: string) =>
  `https://images.weserv.nl/?url=${encodeURIComponent(url)}&w=400&output=webp`;

const SHOES: Shoe[] = [
  {
    id: 1,
    name: "Puma LaFrance Oak Tree",
    year: "2024",
    colorway: "Oak Tree / Natural",
    notes: "Rooted in French heritage.",
    image: proxy("https://image.goat.com/transform/v1/attachments/product_template_pictures/images/113/001/561/original/312978_01.png.png?action=crop&width=700"),
  },
  {
    id: 2,
    name: "Jordan 4 Retro Black Cat",
    year: "2025",
    colorway: "Black / Light Graphite",
    notes: "Stealth mode: engaged.",
    image: proxy("https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/112/064/695/original/1567309_01.jpg.jpeg?action=crop&width=700"),
  },
  {
    id: 3,
    name: "Jordan 11 Retro Neapolitan",
    year: "2019",
    colorway: "Sail / Velvet Brown / Pink",
    notes: "Triple scoop energy.",
    image: proxy("https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/094/716/095/original/1231247_01.jpg.jpeg?action=crop&width=700"),
  },
  {
    id: 4,
    name: "Air Jordan 1 Low Reverse Black Toe",
    year: "2022",
    colorway: "White / Black / Red",
    notes: "Flipped the script on a classic.",
    image: proxy("https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/071/231/507/original/919960_01.jpg.jpeg?action=crop&width=700"),
  },
  {
    id: 5,
    name: "Air Jordan 1 Low Sail Blue Chill",
    year: "2025",
    colorway: "Sail / Blue Chill / Hot Lava",
    notes: "Cool tones, hot pick.",
    image: proxy("https://image.goat.com/transform/v1/attachments/product_template_pictures/images/113/032/592/original/553560_149.png.png?action=crop&width=700"),
  },
  {
    id: 6,
    name: "Air Jordan 1 Mid Concrete Grey",
    year: "2020",
    colorway: "White / Concrete Grey",
    notes: "Low-key never looked so good.",
    image: proxy("https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/082/513/929/original/1101306_01.jpg.jpeg?action=crop&width=700"),
  },
  {
    id: 7,
    name: "Air Jordan 1 Retro High OG UNC Toe",
    year: "2022",
    colorway: "White / University Blue",
    notes: "Carolina blue on a high note.",
    image: proxy("https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/090/732/810/original/1145907_01.jpg.jpeg?action=crop&width=700"),
  },
  {
    id: 8,
    name: "Air Jordan 1 Low 'Jade Smoke'",
    year: "2021",
    colorway: "White / Jade Smoke",
    notes: "Earthy and effortless.",
    image: proxy("https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/099/139/938/original/1387943_01.jpg.jpeg?action=crop&width=700"),
  },
  {
    id: 9,
    name: "Powerpuff Girls x Nike Dunk Low Pro 'Bubbles'",
    year: "2024",
    colorway: "Powerpuff Girls x Nike",
    notes: "Sugar, spice, and everything nice.",
    image: proxy("https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/095/942/950/original/1252846_01.jpg.jpeg?action=crop&width=700"),
  },
  {
    id: 10,
    name: "Nike Dunk Low 'Heat Wave'",
    year: "2021",
    colorway: "Orange / Red / Yellow",
    notes: "Temperature: elevated.",
    image: proxy("https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/099/868/571/original/1399674_01.jpg.jpeg?action=crop&width=700"),
  },
  {
    id: 11,
    name: "Nike Air VaporMax Plus 'Sunshine Yellow'",
    year: "2017",
    colorway: "Yellow",
    notes: "Maximum air, maximum statement.",
    image: "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/079/741/718/original/550238_01.jpg.jpeg?action=crop&width=700",
  },
  {
    id: 12,
    name: "Nike Zoom 2K 'Icon Clash'",
    year: "2019",
    colorway: "White / Cosmic Clay",
    notes: "Y2K never looked this good.",
    image: proxy("https://image.goat.com/transform/v1/attachments/product_template_pictures/images/036/641/890/original/AO0354_105.png.png?action=crop&width=700"),
  },
  {
    id: 13,
    name: "Nike Air MX 720-818 'Aqua'",
    year: "2019",
    colorway: "Aqua / White",
    notes: "Futuristic silhouette, fresh colorway.",
    image: proxy("https://image.goat.com/transform/v1/attachments/product_template_pictures/images/033/592/236/original/CK2607_001.png.png?action=crop&width=700"),
  },
  {
    id: 14,
    name: "ASICS Gel NYC 'White Steel Grey'",
    year: "2023",
    colorway: "White / Steel Grey",
    notes: "Running DNA meets street style.",
    image: proxy("https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/087/678/145/original/1078381_01.jpg.jpeg?action=crop&width=700"),
  },
  {
    id: 15,
    name: "Adidas Campus 00s 'Grey Gum'",
    year: "2023",
    colorway: "Grey / Gum",
    notes: "Clean suede, timeless silhouette.",
    image: proxy("https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/088/303/535/original/1135092_01.jpg.jpeg?action=crop&width=700"),
  },
];

function Collection() {
  return (
    <main className="collection">
      <header className="section-header">
        <h1 className="section-title">My Shoe Collection</h1>
        <p className="section-sub">A curated archive of kicks I own.</p>
      </header>
      <div className="shoe-grid">
        {SHOES.map((shoe) => (
          <article key={shoe.id} className="shoe-card">
            <div className="shoe-card__thumb">
              <img
                src={shoe.image}
                alt={shoe.name}
                className="shoe-card__img"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
              <span className="shoe-card__number">#{String(shoe.id).padStart(2, "0")}</span>
            </div>
            <div className="shoe-card__body">
              <h2 className="shoe-card__name">{shoe.name}</h2>
              <p className="shoe-card__colorway">{shoe.colorway}</p>
              <p className="shoe-card__notes">{shoe.notes}</p>
              <span className="shoe-card__year">Since {shoe.year}</span>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}









// ─── Projects ─────────────────────────────────────────────────────────────────
const PROJECTS: Project[] = [
  {
    id: 1,
    name: "Portfolio Website",
    description: "Personal portfolio and shoe collection built with React, TypeScript, and React Router. Deployed on Netlify.",
    tech: ["React", "TypeScript", "CSS", "Netlify"],
    live: "https://rochelleholland.org",
  },
];

function Projects() {
  return (
    <main className="projects">
      <header className="section-header">
        <h1 className="section-title">Projects</h1>
        <p className="section-sub">Things I've built.</p>
      </header>
      <div className="projects-grid">
        {PROJECTS.map((project) => (
          <article key={project.id} className="project-card">
            <div className="project-card__body">
              <h2 className="project-card__name">{project.name}</h2>
              <p className="project-card__desc">{project.description}</p>
              <div className="project-card__tech">
                {project.tech.map((t) => (
                  <span key={t} className="tech-tag">{t}</span>
                ))}
              </div>
            </div>
            <div className="project-card__links">
              {project.github && (
                <a href={project.github} target="_blank" rel="noreferrer" className="project-link">
                  GitHub
                </a>
              )}
              {project.live && (
                <a href={project.live} target="_blank" rel="noreferrer" className="project-link project-link--primary">
                  Live Site
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
      <p className="projects-coming-soon">More coming soon.</p>
    </main>
  );
}









// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact() {
  const [sent, setSent] = useState(false);

  return (
        <main className="contact">
      <header className="section-header">
        <h1 className="section-title">Say hello</h1>
        <p className="section-sub">I'd love to hear from you.</p>
      </header>
      <div className="contact__layout">
        <div className="contact__info">
          <div className="contact__item">
            <span className="contact__label">Email</span>
            <a className="contact__value contact__link" href="mailto:rochellehdev@yahoo.com">rochellehdev@yahoo.com</a>
          </div>
          <div className="contact__item">
            <span className="contact__label">LinkedIn</span>
            <a className="contact__value contact__link" href="https://www.linkedin.com/in/rochelle-holland-1b9400409/" target="_blank" rel="noreferrer">rochelle-holland</a>
          </div>
          <div className="contact__item">
            <span className="contact__label">GitHub</span>
            <a className="contact__value contact__link" href="https://github.com/hollandro" target="_blank" rel="noreferrer">github.com/hollandro</a>
          </div>
          <div className="contact__item">
            <span className="contact__label">Location</span>
            <span className="contact__value">Denver, Colorado</span>
          </div>
        </div>
        <div className="contact__form-wrap">
          {sent ? (
            <div className="contact__success">
              <p className="contact__success-msg">Message sent! I'll get back to you soon.</p>
            </div>
          ) : (
            <form
              className="contact__form"
              action="https://formspree.io/f/xzdoodvq"
              method="POST"
              onSubmit={() => setSent(true)}
            >
              <div className="field">
                <label className="field__label" htmlFor="name">
                  Name
                </label>
                <input
                  className="field__input"
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                />
              </div>

              <input type="hidden" name="form-name" value="contact" />
              <div className="field">
                <label className="field__label" htmlFor="name">Name</label>
                <input className="field__input" id="name" name="name" type="text" required placeholder="Your name" />
              </div>
              <div className="field">
                <label className="field__label" htmlFor="email">Email</label>
                <input className="field__input" id="email" name="email" type="email" required placeholder="you@example.com" />
              </div>
              <div className="field">
                <label className="field__label" htmlFor="message">Message</label>
                <textarea className="field__input field__textarea" id="message" name="message" required placeholder="What's on your mind?" rows={5} />
              </div>
              <button className="btn-send" type="submit">Send message</button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}









// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">
        © {new Date().getFullYear()} Rochelle Holland. All rights reserved.
      </p>
    </footer>
  );
}







// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}
