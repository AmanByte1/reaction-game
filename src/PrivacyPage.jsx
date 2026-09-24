export default function PrivacyPage({ onBack }) {
  return (
    <div className="info-page">
      <button className="back-btn" onClick={onBack}>← Back to Games</button>

      <article className="info-content">
        <h1>Privacy Policy</h1>
        <p className="info-lead">Last updated: September 2026</p>

        <section>
          <h2>Overview</h2>
          <p>
            Reaction Arcade ("we", "our", or "the site") is committed to protecting your privacy.
            This policy explains what information is collected when you use our website and how it is used.
          </p>
        </section>

        <section>
          <h2>Information We Collect</h2>
          <h3>Data You Generate In-Game</h3>
          <p>
            All game scores, leaderboard rankings, and preferences (such as sound settings) are stored
            exclusively in your browser's <code>localStorage</code>. This data never leaves your device
            and is never transmitted to us or any third party.
          </p>
          <h3>Automatically Collected Data</h3>
          <p>
            Like most websites, our hosting provider may collect standard server log data including your
            IP address, browser type, referring URL, and pages visited. This data is used only for
            security and performance monitoring and is not sold or shared.
          </p>
        </section>

        <section>
          <h2>Advertising (Google AdSense)</h2>
          <p>
            We use <strong>Google AdSense</strong> to display advertisements on this site. Google may use
            cookies and similar technologies to serve ads based on your prior visits to this and other
            websites. You can opt out of personalised advertising by visiting{' '}
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noreferrer">
              Google's Ad Settings
            </a>.
          </p>
          <p>
            For more information on how Google uses data, visit the{' '}
            <a
              href="https://policies.google.com/technologies/partner-sites"
              target="_blank"
              rel="noreferrer"
            >
              Google Privacy &amp; Terms
            </a>{' '}
            page.
          </p>
        </section>

        <section>
          <h2>Cookies</h2>
          <p>
            Reaction Arcade itself does not set cookies. Third-party services (such as Google AdSense)
            may set cookies on your device. You can control or disable cookies through your browser
            settings at any time.
          </p>
        </section>

        <section>
          <h2>Third-Party Links</h2>
          <p>
            Our site may contain links to external websites (e.g., YouTube). We are not responsible for
            the privacy practices or content of those sites. We encourage you to review their privacy
            policies independently.
          </p>
        </section>

        <section>
          <h2>Children's Privacy</h2>
          <p>
            Reaction Arcade is a general-audience gaming platform. We do not knowingly collect personal
            information from children under the age of 13. If you believe a child has provided personal
            information through our site, please contact us and we will promptly remove it.
          </p>
        </section>

        <section>
          <h2>Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this page
            with an updated date. Continued use of the site after changes constitutes acceptance of the
            updated policy.
          </p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>
            If you have any questions about this Privacy Policy, please reach out via our{' '}
            <button
              className="inline-link-btn"
              onClick={() => {}}
            >
              Contact page
            </button>.
          </p>
        </section>
      </article>
    </div>
  );
}
