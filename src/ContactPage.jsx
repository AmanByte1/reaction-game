import { useState } from 'react';

export default function ContactPage({ onBack }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Opens the user's mail client with pre-filled fields
    const subject = encodeURIComponent('Reaction Arcade – Contact Form');
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    );
    window.location.href = `mailto:amanshift.contact@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <div className="info-page">
      <button className="back-btn" onClick={onBack}>← Back to Games</button>

      <article className="info-content">
        <h1>Contact Us</h1>
        <p className="info-lead">
          Have a question, a bug report, a game suggestion, or just want to say hi? Fill in the form
          below and we will get back to you as soon as possible.
        </p>

        {submitted ? (
          <div className="contact-success">
            <span aria-hidden="true">✅</span>
            <p>Thanks! Your mail client should have opened with your message ready to send.</p>
            <button className="info-btn" onClick={() => setSubmitted(false)}>Send Another</button>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <label htmlFor="contact-name">Your Name</label>
            <input
              id="contact-name"
              type="text"
              name="name"
              placeholder="e.g. Alex"
              value={form.name}
              onChange={handleChange}
              required
              autoComplete="name"
            />

            <label htmlFor="contact-email">Your Email</label>
            <input
              id="contact-email"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />

            <label htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              name="message"
              rows="6"
              placeholder="Tell us what's on your mind..."
              value={form.message}
              onChange={handleChange}
              required
            />

            <button type="submit" className="info-btn">Send Message</button>
          </form>
        )}

        <section style={{ marginTop: '2.5rem' }}>
          <h2>Other Ways to Reach Us</h2>
          <ul className="info-list">
            <li>
              <strong>YouTube:</strong>{' '}
              <a href="https://youtube.com/@amanshift?si=fesbTinHNwQ4Slp6" target="_blank" rel="noreferrer">
                @amanshift
              </a>{' '}
              — Leave a comment on any video
            </li>
            <li>
              <strong>GitHub:</strong>{' '}
              <a href="https://github.com/AmanByte1/reaction-game" target="_blank" rel="noreferrer">
                AmanByte1/reaction-game
              </a>{' '}
              — Open an issue for bugs or feature requests
            </li>
          </ul>
        </section>
      </article>
    </div>
  );
}
