import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'The Beige Residence',
    category: 'RESIDENTIAL DESIGN',
    image: 'photo-1600210492486-724fe5c67fb0'
  },
  {
    title: 'Modern Serenity',
    category: 'LUXURY LIVING',
    image: 'photo-1600607687939-ce8a6c25118c'
  },
  {
    title: 'The Art of Living',
    category: 'CONTEMPORARY DESIGN',
    image: 'photo-1600566753086-00f18fb6b3ea'
  }
];

const services = [
  {
    id: 'residential',
    number: '01',
    title: 'Residential Interiors',
    description: 'Beautiful homes designed around your lifestyle.',
    intro: 'Bring warmth, comfort and personality into every corner of your home.',
    items: [
      ['Full Length Mirror', 'Mirrors', 'photo-1618221195710-dd6b41faaea6'],
      ['Luxury Area Rug', 'Rugs & Mats', 'photo-1600166898405-da9535204843'],
      ['Marble Side Table', 'Tables', 'photo-1499933374294-4584851497cc'],
      ['Designer Sofa', 'Furniture', 'photo-1555041469-a586c61ea9bc'],
      ['Modern Floor Lamp', 'Lighting', 'photo-1507473885765-e6ed057f782c'],
      ['Indoor Green Plant', 'Decor', 'photo-1485955900006-10f4d324d411'],
      ['Wall Art', 'Wall Decor', 'photo-1579783902614-a3fb3927b6a5'],
      ['Decorative Table Set', 'Accessories', 'photo-1490312278390-ab64016e0aa9']
    ]
  },
  {
    id: 'commercial',
    number: '02',
    title: 'Commercial Spaces',
    description: 'Inspiring workspaces with purpose and identity.',
    intro: 'Create a professional environment that inspires people and reflects your brand.',
    items: [
      ['Executive Office Desk', 'Furniture', 'photo-1497366754035-f200968a6e72'],
      ['Ergonomic Office Chair', 'Seating', 'photo-1505843490538-5133c6c7d0e1'],
      ['Conference Table', 'Furniture', 'photo-1497366811353-6870744d04b2'],
      ['Pendant Office Lights', 'Lighting', 'photo-1497366216548-37526070297c'],
      ['Reception Furniture', 'Reception', 'photo-1497366412874-3415097a27e7'],
      ['Storage Cabinet', 'Storage', 'photo-1497366754035-f200968a6e72']
    ]
  },
  {
    id: 'planning',
    number: '03',
    title: 'Space Planning',
    description: 'Smart layouts that balance beauty and function.',
    intro: 'Choose furniture and decor to build a practical, balanced room layout.',
    items: [
      ['Full Length Mirror', 'Mirrors', 'photo-1618221195710-dd6b41faaea6'],
      ['Floor Mat & Area Rug', 'Rugs & Mats', 'photo-1600166898405-da9535204843'],
      ['Side Table', 'Tables', 'photo-1499933374294-4584851497cc'],
      ['Three-Seater Sofa', 'Furniture', 'photo-1555041469-a586c61ea9bc'],
      ['Wall Mirror', 'Mirrors', 'photo-1616486338812-3dadae4b4ace'],
      ['Table Lamp', 'Lighting', 'photo-1507473885765-e6ed057f782c'],
      ['Indoor Plant', 'Decor', 'photo-1485955900006-10f4d324d411'],
      ['Wall Art', 'Wall Decor', 'photo-1579783902614-a3fb3927b6a5']
    ]
  }
];

function App() {
  const websiteRef = useRef(null);
  const cursorRef = useRef(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [comparison, setComparison] = useState(50);
  const [activeService, setActiveService] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [filter, setFilter] = useState('All');

  // Home page animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.navbar', {
        y: -35,
        opacity: 0,
        duration: 0.8
      });

      gsap.from('.hero-content > *', {
        y: 35,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        delay: 0.2
      });

      gsap.utils.toArray(
        '.section-label, .section-heading h2, .intro h2, .contact h2'
      ).forEach((element) => {
        gsap.from(element, {
          y: 35,
          opacity: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            once: true
          }
        });
      });

      gsap.from('.service-card, .project-card', {
        y: 45,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
          trigger: '.service-grid',
          start: 'top 85%',
          once: true
        }
      });
    }, websiteRef);

    return () => ctx.revert();
  }, []);

  // Custom cursor - works on home and service pages
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const moveCursor = (event) => {
      const cursor = cursorRef.current;

      if (!cursor) return;

      gsap.set(cursor, {
        x: event.clientX,
        y: event.clientY,
        opacity: 1,
        visibility: 'visible'
      });
    };

    const hideCursor = () => {
      const cursor = cursorRef.current;

      if (cursor) {
        gsap.to(cursor, {
          opacity: 0,
          duration: 0.2
        });
      }
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', hideCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', hideCursor);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const openService = (service) => {
    setActiveService(service);
    setSelectedItems([]);
    setFilter('All');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goHome = () => {
    setActiveService(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleItem = (item) => {
    setSelectedItems((current) =>
      current.some((selected) => selected[0] === item[0])
        ? current.filter((selected) => selected[0] !== item[0])
        : [...current, item]
    );
  };

  const sendEnquiry = () => {
    if (!activeService || selectedItems.length === 0) return;

    const itemNames = selectedItems.map((item) => item[0]).join(', ');

    const subject = encodeURIComponent(
      `SYEDA ${activeService.title} Enquiry`
    );

    const body = encodeURIComponent(
      `Hello SYEDA Studio,\n\nI am interested in ${activeService.title}.\n\nSelected items:\n${itemNames}\n\nPlease contact me with more details.\n\nThank you.`
    );

    window.location.href =
      `mailto:hello@syedastudio.com?subject=${subject}&body=${body}`;
  };

  // Service detail pages
  if (activeService) {
    const categories = [
      'All',
      ...new Set(activeService.items.map((item) => item[1]))
    ];

    const visibleItems =
      filter === 'All'
        ? activeService.items
        : activeService.items.filter((item) => item[1] === filter);

    return (
      <div className="service-page">

        {/* Custom cursor on service pages */}
        <div className="custom-cursor" ref={cursorRef}></div>

        <nav className="service-page-nav">
          <a
            href="#home"
            className="logo"
            onClick={(event) => {
              event.preventDefault();
              goHome();
            }}
          >
            SYEDA<span>.</span>
            <small>INTERIOR DESIGN STUDIO</small>
          </a>

          <button
            className="service-back"
            onClick={goHome}
            type="button"
          >
            ← Back to Home
          </button>
        </nav>

        <section className="service-page-hero">
          <p>{activeService.number} — OUR SERVICES</p>
          <h1>{activeService.title}</h1>
          <span>{activeService.intro}</span>
        </section>

        <section className="service-selection">
          <div className="service-selection-heading">
            <div>
              <p className="section-label">EXPLORE OUR COLLECTION</p>
              <h2>Select your <i>essentials.</i></h2>
              <p className="selection-description">
                Explore the collection and select the items you would like
                included in your design enquiry.
              </p>
            </div>

            <div className="selection-count">
              <strong>{selectedItems.length}</strong>
              <span>ITEMS SELECTED</span>
            </div>
          </div>

          <div className="service-filters">
            {categories.map((category) => (
              <button
                key={category}
                className={filter === category ? 'active' : ''}
                onClick={() => setFilter(category)}
                type="button"
              >
                {category}
              </button>
            ))}
          </div>

          <div className="item-grid">
            {visibleItems.map((item) => {
              const isSelected = selectedItems.some(
                (selected) => selected[0] === item[0]
              );

              return (
                <article
                  className={`item-card ${isSelected ? 'item-selected' : ''}`}
                  key={item[0]}
                >
                  <div className="item-image">
                    <img
                      src={`https://images.unsplash.com/${item[2]}?auto=format&fit=crop&w=800&q=85`}
                      alt={item[0]}
                    />
                    <span>{item[1]}</span>
                  </div>

                  <div className="item-info">
                    <h3>{item[0]}</h3>

                    <button
                      className={
                        isSelected ? 'selected-button' : 'select-button'
                      }
                      onClick={() => toggleItem(item)}
                      type="button"
                    >
                      {isSelected ? '✓ Selected' : '+ Add to Selection'}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="selection-summary">
            <div>
              <p>YOUR DESIGN SELECTION</p>

              <h3>
                {selectedItems.length === 0
                  ? 'No items selected yet'
                  : `${selectedItems.length} items added to your selection`}
              </h3>

              {selectedItems.length > 0 && (
                <div className="selected-list">
                  {selectedItems.map((item) => (
                    <span key={item[0]}>{item[0]}</span>
                  ))}
                </div>
              )}
            </div>

            <button
              className="enquiry-button"
              disabled={selectedItems.length === 0}
              onClick={sendEnquiry}
              type="button"
            >
              Send Enquiry ↗
            </button>
          </div>
        </section>

        <footer>
          <a href="#home" className="logo" onClick={(event) => {
            event.preventDefault();
            goHome();
          }}>
            SYEDA<span>.</span>
            <small>INTERIOR DESIGN STUDIO</small>
          </a>

          <p>© 2026 SYEDA. ALL RIGHTS RESERVED.</p>
        </footer>
      </div>
    );
  }

  // Main home page
  return (
    <div className="website" ref={websiteRef}>
      <div className="custom-cursor" ref={cursorRef}></div>

      <nav className="navbar">
        <a href="#home" className="logo" onClick={closeMenu}>
          SYEDA<span>.</span>
          <small>INTERIOR DESIGN STUDIO</small>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '×' : '☰'}
        </button>

        <div className={`nav-links ${menuOpen ? 'menu-open' : ''}`}>
          <a href="#home" onClick={closeMenu}>Home</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#services" onClick={closeMenu}>Services</a>
          <a href="#projects" onClick={closeMenu}>Projects</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
        </div>

        <a href="#contact" className="nav-button">
          Let's Talk <span>↗</span>
        </a>
      </nav>

      <main>
        <section className="hero" id="home">
          <video
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
            poster="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=90"
          >
            <source src="/videos/syeda-interior.mp4" type="video/mp4" />
          </video>

          <div className="hero-overlay"></div>

          <div className="hero-content">
            <p className="eyebrow">ELEVATED INTERIOR EXPERIENCES</p>

            <h1>
              Spaces that
              <br />
              tell your <i>story.</i>
            </h1>

            <p className="hero-description">
              Thoughtfully designed interiors that bring elegance,
              comfort and timeless beauty into everyday living.
            </p>

            <a href="#projects" className="primary-button">
              Explore Our Work <span>↗</span>
            </a>
          </div>

          <div className="hero-bottom">
            <span>01 / 03 — THE ART OF INTERIOR LIVING</span>
            <span>SCROLL TO EXPLORE ↓</span>
          </div>
        </section>

        <section className="intro section-padding" id="about">
          <div className="section-label">01 — WHO WE ARE</div>

          <div className="intro-content">
            <h2>
              We create spaces
              <br />
              that feel like <i>home.</i>
            </h2>

            <div className="intro-text">
              <p>
                We believe great interiors are more than beautiful spaces.
                They reflect personality, inspire creativity and make
                everyday moments extraordinary.
              </p>

              <a href="#contact" className="text-link">
                Discover Our Story ↗
              </a>
            </div>
          </div>
        </section>

        <section className="services section-padding" id="services">
          <div className="section-heading">
            <div>
              <div className="section-label">02 — WHAT WE DO</div>
              <h2>Designed around <i>you.</i></h2>
            </div>

            <p>Every detail matters. Every space has a story.</p>
          </div>

          <div className="service-grid">
            {services.map((service) => (
              <button
                className="service-card"
                key={service.id}
                onClick={() => openService(service)}
                type="button"
              >
                <span>{service.number}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <b>Explore ↗</b>
              </button>
            ))}
          </div>
        </section>

        <section className="projects section-padding" id="projects">
          <div className="section-heading">
            <div>
              <div className="section-label">03 — SELECTED WORKS</div>
              <h2>Spaces we've <i>shaped.</i></h2>
            </div>

            <p>A collection of spaces made with intention.</p>
          </div>

          <div className="project-grid">
            {projects.map((project, index) => (
              <article className="project-card" key={project.title}>
                <div className="project-image">
                  <img
                    src={`https://images.unsplash.com/${project.image}?auto=format&fit=crop&w=1000&q=85`}
                    alt={project.title}
                  />

                  <span className="project-number">0{index + 1}</span>
                </div>

                <p>{project.category}</p>
                <h3>{project.title}</h3>
              </article>
            ))}
          </div>
        </section>

        <section className="comparison-section section-padding">
          <div className="section-label">04 — DESIGN TRANSFORMATION</div>

          <div className="comparison-heading">
            <h2>A new perspective on <i>living.</i></h2>
            <p>Explore the difference thoughtful interior design can make.</p>
          </div>

          <div className="comparison-container">
            <img
              className="comparison-before"
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=90"
              alt="Before design example"
            />

            <div
              className="comparison-after"
              style={{ clipPath: `inset(0 ${100 - comparison}% 0 0)` }}
            >
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=90"
                alt="After design example"
              />
            </div>

            <span className="comparison-label before-label">BEFORE</span>
            <span className="comparison-label after-label">AFTER</span>

            <div
              className="comparison-divider"
              style={{ left: `${comparison}%` }}
            >
              <span>↔</span>
            </div>

            <input
              className="comparison-range"
              type="range"
              min="0"
              max="100"
              value={comparison}
              onChange={(event) =>
                setComparison(Number(event.target.value))
              }
              aria-label="Compare before and after interior images"
            />
          </div>

          <p className="comparison-hint">DRAG THE SLIDER TO COMPARE</p>
        </section>

        <section className="statement">
          <p>THE ART OF THOUGHTFUL LIVING</p>

          <h2>
            Beauty is in the
            <br />
            details <i>we create.</i>
          </h2>

          <a href="#contact" className="light-button">
            Start Your Project ↗
          </a>
        </section>

        <section className="contact section-padding" id="contact">
          <div className="section-label">05 — GET IN TOUCH</div>
          <h2>Let's create something <i>beautiful.</i></h2>

          <a href="mailto:hello@syedastudio.com" className="text-link">
            hello@syedastudio.com ↗
          </a>
        </section>
      </main>

      <footer>
        <a href="#home" className="logo">
          SYEDA<span>.</span>
          <small>INTERIOR DESIGN STUDIO</small>
        </a>

        <p>© 2026 SYEDA. ALL RIGHTS RESERVED.</p>
        <a href="#home">BACK TO TOP ↑</a>
      </footer>
    </div>
  );
}

export default App;