export default function Footer() {
  return (
    <footer className="footer">
      <div>
        <p className="footer__title">Contact</p>
        <a className="footer__mail" href="mailto:hello@example.com">
          hello@example.com
        </a>
      </div>
      <p className="footer__meta">© {new Date().getFullYear()} ZOO — Built with React, GSAP &amp; Motion</p>
    </footer>
  )
}
