export default function Footer() {
  return (
    <footer className="footer">
      <div>
        <p className="footer__title">Contact</p>
        <a className="footer__mail" href="mailto:zoozero3939@gmail.com">
          zoozero3939@gmail.com
        </a>
      </div>
      <p className="footer__meta">© {new Date().getFullYear()} ZOO — Built with React, GSAP &amp; Motion</p>
    </footer>
  )
}
