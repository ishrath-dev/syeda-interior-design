
import { useState } from "react";
import "./App.css";

const photo = (id, width = 1000) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

const rooms = [
  {
    name: "Living Room",
    image: "photo-1600210492486-724fe5c67fb0",
    description: "Comfortable, elegant spaces for everyday living.",
    materials: ["Velvet upholstery", "Walnut wood", "Calacatta marble", "Antique brass", "Linen curtains"],
    finishes: ["Warm beige", "Natural walnut", "Brushed gold"],
  },
  {
    name: "Bedroom",
    image: "photo-1616486338812-3dadae4b4ace",
    description: "Peaceful retreats designed around comfort.",
    materials: ["Soft linen", "Oak veneer", "Textured wallpaper", "Velvet headboard", "Warm ambient lighting"],
    finishes: ["Ivory cream", "Natural oak", "Soft taupe"],
  },
  {
    name: "Kitchen",
    image: "photo-1600607687939-ce8a6c25118c",
    description: "Functional kitchens with carefully selected finishes.",
    materials: ["Quartz countertop", "Matte laminate", "Wood veneer", "Glass cabinets", "Brushed steel"],
    finishes: ["Marble white", "Walnut brown", "Matte ivory"],
  },
  {
    name: "Dining Room",
    image: "photo-1600210491369-e753d80a41f3",
    description: "Welcoming dining spaces for memorable gatherings.",
    materials: ["Solid wood", "Marble tabletop", "Velvet dining chairs", "Pendant lighting", "Decorative wall panels"],
    finishes: ["Antique wood", "Cream marble", "Aged brass"],
  },
  {
    name: "Workspace",
    image: "photo-1497366754035-f200968a6e72",
    description: "Beautiful and productive work environments.",
    materials: ["Engineered wood", "Acoustic panels", "Glass partitions", "Metal hardware", "Task lighting"],
    finishes: ["Natural oak", "Charcoal", "Warm white"],
  },
  {
    name: "Entryway",
    image: "photo-1600607687920-4e2a09cf159d",
    description: "A beautiful first impression with thoughtful details.",
    materials: ["Decorative mirror", "Stone flooring", "Console wood", "Antique hardware", "Wall moulding"],
    finishes: ["Travertine", "Dark walnut", "Antique gold"],
  },
];

const designStyles = [
  {
    name: "Modern Minimal",
    detail: "Clean lines, calm neutrals and uncluttered spaces.",
    colors: ["#eee7dc", "#b8a28b", "#756454"],
  },
  {
    name: "Contemporary",
    detail: "A balanced mix of current forms and timeless materials.",
    colors: ["#e8dfd2", "#9c8068", "#51463d"],
  },
  {
    name: "Traditional",
    detail: "Classic detailing, rich wood and elegant finishes.",
    colors: ["#e8d9c4", "#98704f", "#493329"],
  },
  {
    name: "Warm Luxury",
    detail: "Soft textures, warm metals and refined statement pieces.",
    colors: ["#f0e5d5", "#b28b62", "#6b5140"],
  },
];

const finishOptions = [
  {
    name: "Natural Oak",
    type: "Wood",
    image: "photo-1618221195710-dd6b41faaea6",
    note: "Light, natural grain with a warm understated finish.",
  },
  {
    name: "Walnut Veneer",
    type: "Wood",
    image: "photo-1600607687939-ce8a6c25118c",
    note: "Deep brown tones for a rich, timeless look.",
  },
  {
    name: "Ivory Marble",
    type: "Stone",
    image: "photo-1600607687920-4e2a09cf159d",
    note: "Soft veining and a bright, elegant surface.",
  },
  {
    name: "Travertine",
    type: "Stone",
    image: "photo-1600210492486-724fe5c67fb0",
    note: "Natural texture with subtle earthy character.",
  },
  {
    name: "Brushed Brass",
    type: "Metal",
    image: "photo-1600210491369-e753d80a41f3",
    note: "A muted golden accent for fixtures and details.",
  },
  {
    name: "Linen Texture",
    type: "Fabric",
    image: "photo-1616486338812-3dadae4b4ace",
    note: "Soft, tactile fabric that adds warmth and comfort.",
  },
];

const decorItems = [
  {
    name: "Lounge Sofa",
    category: "Furniture",
    image: "photo-1555041469-a586c61ea9bc",
    description: "Comfortable seating with timeless elegance.",
  },
  {
    name: "Accent Chair",
    category: "Furniture",
    image: "photo-1567538096630-e0c55bd6374c",
    description: "A statement piece for a refined interior.",
  },
  {
    name: "Coffee Table",
    category: "Furniture",
    image: "photo-1499933374294-4584851497cc",
    description: "Functional design with beautiful detailing.",
  },
  {
    name: "Floor Rug",
    category: "Textiles",
    image: "photo-1600210492486-724fe5c67fb0",
    description: "Add warmth and texture to your space.",
  },
  {
    name: "Pendant Light",
    category: "Lighting",
    image: "photo-1507473885765-e6ed057f782c",
    description: "Create a warm and inviting atmosphere.",
  },
  {
    name: "Ceramic Vase",
    category: "Decor",
    image: "photo-1578500494198-246f612d3b3d",
    description: "Subtle decorative details for your room.",
  },
  {
    name: "Wall Art",
    category: "Decor",
    image: "photo-1579783902614-a3fb3927b6a5",
    description: "Give your walls a personal touch.",
  },
  {
    name: "Table Lamp",
    category: "Lighting",
    image: "photo-1507473885765-e6ed057f782c",
    description: "Soft lighting for a relaxed atmosphere.",
  },
];

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="section-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

export default function App() {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [slider, setSlider] = useState(50);
  const [selectedDecor, setSelectedDecor] = useState([]);
  const [selectedStyle, setSelectedStyle] = useState(designStyles[0]);
  const [finishOne, setFinishOne] = useState(finishOptions[0]);
  const [finishTwo, setFinishTwo] = useState(finishOptions[2]);
  const [spaceWidth, setSpaceWidth] = useState("12");
  const [spaceLength, setSpaceLength] = useState("15");
  const [budgetRate, setBudgetRate] = useState("1800");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    project: "Residential Interior",
    location: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState("");
  const [sending, setSending] = useState(false);

  const handleInput = (event) => {
    setFormData((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  };

  const toggleDecor = (item) => {
    setSelectedDecor((previous) =>
      previous.some((selected) => selected.name === item.name)
        ? previous.filter((selected) => selected.name !== item.name)
        : [...previous, item]
    );
  };

  const submitEnquiry = async (event) => {
    event.preventDefault();
    setSending(true);
    setFormStatus("");

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/syedaishrathishu786@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            ...formData,
            _subject: "New SYEDA Interior Studio Enquiry",
            _captcha: "false",
          }),
        }
      );

      const result = await response.json();

      if (response.ok && result.success === "true") {
        setFormStatus(
          "Thank you! Your enquiry has been submitted successfully."
        );

        setFormData({
          name: "",
          email: "",
          phone: "",
          project: "Residential Interior",
          location: "",
          message: "",
        });
      } else {
        throw new Error("Submission failed");
      }
    } catch {
      setFormStatus(
        "Unable to submit right now. Please email syedaishrathishu786@gmail.com."
      );
    } finally {
      setSending(false);
    }
  };

  const area =
    Math.max(0, Number(spaceWidth) || 0) *
    Math.max(0, Number(spaceLength) || 0);

  const estimatedBudget = area * Number(budgetRate);

  return (
    <main>
      {/* HEADER */}
      <header className="site-header">
        <a href="#home" className="brand">
          <span className="brand-symbol">S</span>
          <span>
            <strong>SYEDA</strong>
            <small>INTERIOR STUDIO</small>
          </span>
        </a>

        <nav className="main-nav">
          <a href="#home">Home</a>
          <a href="#spaces">Our Expertise</a>
          <a href="#transformation">Transformation</a>
          <a href="#material-library">Material Library</a>
          <a href="#design-studio">Design Studio</a>
          <a href="#contact" className="nav-contact">
            Let's Talk ↗
          </a>
        </nav>
      </header>

      {/* HERO */}
      <section className="hero" id="home">
        <video className="hero-video" autoPlay muted loop playsInline>
          <source src="/videos/syeda-interior.mp4" type="video/mp4" />
        </video>

        <div className="hero-overlay" />

        <div className="hero-content">
          <span className="hero-kicker">
            INTERIORS THAT FEEL LIKE YOU
          </span>
          <h1>
            Spaces with
            <br />
            <em>a story to tell.</em>
          </h1>
          <p>
            Thoughtful interiors, timeless materials and personal details —
            designed to make every space feel special.
          </p>
          <a href="#spaces" className="hero-button">
            Explore Our Expertise ↗
          </a>
        </div>

        <div className="hero-bottom">
          <span>RESIDENTIAL · COMMERCIAL · BESPOKE</span>
          <span>SYEDA INTERIOR STUDIO</span>
        </div>
      </section>

      {/* INTRO */}
      <section className="intro-section">
        <div className="intro-label">THE SYEDA APPROACH</div>
        <div className="intro-copy">
          <h2>
            Good design is not just seen.
            <br />
            <em>It is experienced.</em>
          </h2>
          <p>
            We bring together thoughtful planning, beautiful materials and
            distinctive design styles to create spaces that reflect the people
            who live and work in them.
          </p>
        </div>
      </section>

      {/* OUR EXPERTISE */}
      <section className="spaces-section section-pad" id="spaces">
        <SectionHeading
          eyebrow="OUR EXPERTISE"
          title="Spaces made personal."
          description="Select a space to explore its materials, finishes and design details."
        />

        <div className="rooms-grid">
          {rooms.map((room, index) => (
            <button
              className="room-card"
              key={room.name}
              onClick={() => setSelectedRoom(room)}
              type="button"
            >
              <div className="room-image-wrap">
                <img src={photo(room.image, 900)} alt={room.name} />
                <span className="room-number">0{index + 1}</span>
                <span className="room-arrow">↗</span>
              </div>
              <div className="room-card-info">
                <h3>{room.name}</h3>
                <p>{room.description}</p>
                <span className="explore-room">EXPLORE MATERIALS ↗</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* BEFORE AND AFTER SLIDER */}
      <section
        className="transformation-section section-pad"
        id="transformation"
      >
        <SectionHeading
          eyebrow="THE ART OF TRANSFORMATION"
          title="See the difference."
          description="Move the slider to explore two interior looks in one space."
        />

        <div className="slider-heading">
          <h3>Before &amp; After Transformation</h3>
          <span className="slider-hint">Drag the handle to compare</span>
        </div>

        <div className="before-after">
          <div className="before-after-image">
            <img
              className="after-image"
              src={photo("photo-1600210492486-724fe5c67fb0", 1400)}
              alt="After interior transformation"
            />

            <div
              className="before-image-clip"
              style={{ width: `${slider}%` }}
            >
              <img
                src={photo("photo-1616486029423-aaa4789e8c9a", 1400)}
                alt="Before interior transformation"
                style={{ width: `${10000 / Math.max(slider, 1)}%` }}
              />
            </div>

            <span className="compare-label before-label">BEFORE</span>
            <span className="compare-label after-label">AFTER</span>

            <div className="slider-line" style={{ left: `${slider}%` }}>
              <span className="slider-handle">↔</span>
            </div>

            <input
              aria-label="Compare before and after room"
              className="slider-input"
              type="range"
              min="0"
              max="100"
              value={slider}
              onChange={(event) => setSlider(Number(event.target.value))}
            />
          </div>

          <p className="comparison-note">
            A visual example of how thoughtful interior choices can transform a room.
          </p>
        </div>
      </section>

      {/* MATERIAL LIBRARY */}
      <section
        className="material-library-section section-pad"
        id="material-library"
      >
        <div className="material-library-top">
          <div>
            <span className="eyebrow">EXPLORE OUR COLLECTION</span>
            <h2>Find your finishing touch.</h2>
            <p>
              Explore our curated decor collection and select the pieces
              that bring your dream space to life.
            </p>
          </div>

          <span className="playground-number">
            DESIGN STUDIO / 01
          </span>
        </div>

        <div className="material-library-layout">
          <div className="decor-grid">
            {decorItems.map((item) => {
              const isSelected = selectedDecor.some(
                (selected) => selected.name === item.name
              );

              return (
                <article className="decor-card" key={item.name}>
                  <div className="decor-image-wrap">
                    <img
                      src={photo(item.image, 650)}
                      alt={item.name}
                    />
                    <span className="decor-category">
                      {item.category}
                    </span>
                  </div>

                  <div className="decor-card-info">
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>

                    <button
                      type="button"
                      className={`decor-select-button ${
                        isSelected ? "selected" : ""
                      }`}
                      onClick={() => toggleDecor(item)}
                    >
                      {isSelected ? "✓ Selected" : "+ Add item"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          <aside className="decor-selection-panel">
            <span className="eyebrow">YOUR COLLECTION</span>
            <h3>Your selected pieces.</h3>
            <p>
              Build your personal collection by choosing items from
              our library.
            </p>

            <div className="decor-selection-count">
              <strong>{selectedDecor.length}</strong>
              <span>ITEMS SELECTED</span>
            </div>

            {selectedDecor.length === 0 ? (
              <div className="decor-empty">
                <span>✧</span>
                <p>Your selected decor items will appear here.</p>
              </div>
            ) : (
              <div className="selected-decor-list">
                {selectedDecor.map((item) => (
                  <div
                    className="selected-decor-item"
                    key={item.name}
                  >
                    <img
                      src={photo(item.image, 180)}
                      alt={item.name}
                    />

                    <div>
                      <strong>{item.name}</strong>
                      <small>{item.category}</small>
                    </div>

                    <button
                      type="button"
                      aria-label={`Remove ${item.name}`}
                      onClick={() => toggleDecor(item)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            <a
              href="#contact"
              className="decor-enquiry-button"
              onClick={() =>
                setFormData((previous) => ({
                  ...previous,
                  message: selectedDecor.length
                    ? `I am interested in these decor items: ${selectedDecor
                        .map((item) => item.name)
                        .join(", ")}.`
                    : previous.message,
                }))
              }
            >
              Discuss your selection ↗
            </a>
          </aside>
        </div>
      </section>

      {/* DESIGN STUDIO */}
      <section
        className="design-studio-section section-pad"
        id="design-studio"
      >
        <SectionHeading
          eyebrow="INTERACTIVE DESIGN STUDIO"
          title="Make the details yours."
          description="Explore styles, compare finishes, plan your space and estimate a starting budget."
        />

        <div className="studio-tool-grid">
          {/* STYLE FINDER */}
          <article className="studio-tool studio-style-tool">
            <div className="studio-tool-heading">
              <span className="studio-tool-number">01</span>
              <div>
                <span className="eyebrow">DISCOVER YOUR LOOK</span>
                <h3>Style Finder</h3>
                <p>Choose the design direction that feels most like you.</p>
              </div>
            </div>

            <div className="style-options">
              {designStyles.map((style) => (
                <button
                  type="button"
                  key={style.name}
                  className={`style-option ${
                    selectedStyle.name === style.name ? "active" : ""
                  }`}
                  onClick={() => setSelectedStyle(style)}
                >
                  <span className="style-colors">
                    {style.colors.map((color) => (
                      <i key={color} style={{ background: color }} />
                    ))}
                  </span>
                  <span className="style-option-copy">
                    <strong>{style.name}</strong>
                    <small>{style.detail}</small>
                  </span>
                  <b>{selectedStyle.name === style.name ? "✓" : "↗"}</b>
                </button>
              ))}
            </div>

            <div className="selected-style-note">
              <strong>Your selected direction: {selectedStyle.name}</strong>
              <span>{selectedStyle.detail}</span>
            </div>
          </article>

          {/* FINISH COMPARISON */}
          <article className="studio-tool">
            <div className="studio-tool-heading">
              <span className="studio-tool-number">02</span>
              <div>
                <span className="eyebrow">MATERIAL PAIRING</span>
                <h3>Finish Comparison</h3>
                <p>Compare two finishes side by side before making a choice.</p>
              </div>
            </div>

            <div className="finish-selectors">
              <label>
                FINISH ONE
                <select
                  value={finishOne.name}
                  onChange={(event) =>
                    setFinishOne(
                      finishOptions.find(
                        (item) => item.name === event.target.value
                      )
                    )
                  }
                >
                  {finishOptions.map((item) => (
                    <option key={item.name} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                FINISH TWO
                <select
                  value={finishTwo.name}
                  onChange={(event) =>
                    setFinishTwo(
                      finishOptions.find(
                        (item) => item.name === event.target.value
                      )
                    )
                  }
                >
                  {finishOptions.map((item) => (
                    <option key={item.name} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="finish-comparison-grid">
              {[finishOne, finishTwo].map((finish, index) => (
                <div
                  className="finish-preview-card"
                  key={`${index}-${finish.name}`}
                >
                  <img src={photo(finish.image, 700)} alt={finish.name} />
                  <div>
                    <small>{finish.type}</small>
                    <strong>{finish.name}</strong>
                    <p>{finish.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>

          {/* SPACE PLANNING */}
          <article className="studio-tool">
            <div className="studio-tool-heading">
              <span className="studio-tool-number">03</span>
              <div>
                <span className="eyebrow">PLAN YOUR ROOM</span>
                <h3>Space Planning</h3>
                <p>Enter your room dimensions to calculate its floor area.</p>
              </div>
            </div>

            <div className="space-planner-visual">
              <div className="space-plan-box">
                <span className="space-plan-width">{spaceWidth || "0"} ft</span>
                <span className="space-plan-length">{spaceLength || "0"} ft</span>
                <div className="space-plan-center">
                  <span>ROOM AREA</span>
                  <strong>{area.toLocaleString("en-IN")} sq.ft</strong>
                </div>
              </div>
            </div>

            <div className="space-inputs">
              <label>
                WIDTH (FEET)
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={spaceWidth}
                  onChange={(event) => setSpaceWidth(event.target.value)}
                />
              </label>
              <label>
                LENGTH (FEET)
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={spaceLength}
                  onChange={(event) => setSpaceLength(event.target.value)}
                />
              </label>
            </div>

            <p className="studio-disclaimer">
              A simple floor-area estimate to help begin your space planning.
            </p>
          </article>

          {/* BUDGET ESTIMATOR */}
          <article className="studio-tool studio-budget-tool">
            <div className="studio-tool-heading">
              <span className="studio-tool-number">04</span>
              <div>
                <span className="eyebrow">PLAN YOUR INVESTMENT</span>
                <h3>Budget Estimator</h3>
                <p>Get an indicative interior budget based on your room area.</p>
              </div>
            </div>

            <label className="budget-rate-label">
              ESTIMATED RATE PER SQ.FT
              <select
                value={budgetRate}
                onChange={(event) => setBudgetRate(event.target.value)}
              >
                <option value="1200">Essential — ₹1,200 / sq.ft</option>
                <option value="1800">Comfort — ₹1,800 / sq.ft</option>
                <option value="2500">Premium — ₹2,500 / sq.ft</option>
                <option value="3500">Luxury — ₹3,500 / sq.ft</option>
              </select>
            </label>

            <div className="budget-result">
              <span>YOUR INDICATIVE ESTIMATE</span>
              <strong>₹{estimatedBudget.toLocaleString("en-IN")}</strong>
              <small>Based on {area.toLocaleString("en-IN")} sq.ft</small>
            </div>

            <p className="studio-disclaimer">
              This is an initial planning estimate, not a quotation. Final costs
              depend on site conditions, materials, scope and specifications.
            </p>

            <a className="studio-enquiry-link" href="#contact">
              Discuss your project with us ↗
            </a>
          </article>
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact-section section-pad" id="contact">
        <div className="contact-intro">
          <span className="eyebrow">LET'S CREATE SOMETHING MEANINGFUL</span>
          <h2>
            Your space.
            <br />
            <em>Your story.</em>
          </h2>
          <p>
            Tell us a little about your project. We would love to hear your
            ideas and help bring them to life.
          </p>
          <a
            href="mailto:syedaishrathishu786@gmail.com"
            className="contact-email"
          >
            syedaishrathishu786@gmail.com ↗
          </a>
        </div>

        <form className="enquiry-form" onSubmit={submitEnquiry}>
          <div className="form-heading">
            <span>01 — START A CONVERSATION</span>
            <h3>Project Enquiry</h3>
          </div>

          <div className="form-row">
            <label>
              YOUR NAME *
              <input
                name="name"
                value={formData.name}
                onChange={handleInput}
                required
                placeholder="Full name"
              />
            </label>

            <label>
              EMAIL ADDRESS *
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInput}
                required
                placeholder="Your email"
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              PHONE NUMBER
              <input
                name="phone"
                value={formData.phone}
                onChange={handleInput}
                placeholder="Your phone number"
              />
            </label>

            <label>
              PROJECT TYPE
              <select
                name="project"
                value={formData.project}
                onChange={handleInput}
              >
                <option>Residential Interior</option>
                <option>Commercial Interior</option>
                <option>Renovation</option>
                <option>Space Planning</option>
                <option>Other</option>
              </select>
            </label>
          </div>

          <label>
            PROJECT LOCATION
            <input
              name="location"
              value={formData.location}
              onChange={handleInput}
              placeholder="City / Location"
            />
          </label>

          <label>
            TELL US ABOUT YOUR PROJECT *
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInput}
              required
              rows="4"
              placeholder="Share your ideas, requirements and preferred style..."
            />
          </label>

          <button className="submit-button" type="submit" disabled={sending}>
            {sending ? "Sending enquiry..." : "Send Enquiry"}
            <span>↗</span>
          </button>

          {formStatus && <p className="form-status">{formStatus}</p>}

          <small className="form-privacy">
            Your details will only be used to respond to your enquiry.
          </small>
        </form>
      </section>

      {/* FOOTER */}
      <footer className="site-footer">
        <a href="#home" className="footer-brand">
          SYEDA<span> INTERIOR STUDIO</span>
        </a>

        <p>Thoughtful spaces. Timeless stories.</p>

        <div className="footer-bottom">
          <span>© 2026 SYEDA INTERIOR STUDIO</span>
          <a href="#home">BACK TO TOP ↑</a>
        </div>
      </footer>

      {/* ROOM MATERIAL DETAILS */}
      {selectedRoom && (
        <div
          className="room-modal-backdrop"
          onClick={() => setSelectedRoom(null)}
        >
          <div
            className="room-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelectedRoom(null)}
              type="button"
              aria-label="Close room details"
            >
              ×
            </button>

            <img
              src={photo(selectedRoom.image, 1100)}
              alt={selectedRoom.name}
            />

            <div className="room-modal-copy">
              <span className="eyebrow">OUR EXPERTISE</span>
              <h2>{selectedRoom.name}</h2>
              <p>{selectedRoom.description}</p>

              <h3>Materials &amp; Finishes</h3>
              <div className="room-material-list">
                {selectedRoom.materials.map((material) => (
                  <span key={material}>{material}</span>
                ))}
              </div>

              <h3>Suggested Colour Finishes</h3>
              <div className="room-finish-list">
                {selectedRoom.finishes.map((finish) => (
                  <span key={finish}>{finish}</span>
                ))}
              </div>

              <a
                href="#contact"
                onClick={() => setSelectedRoom(null)}
              >
                Enquire about this space ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
