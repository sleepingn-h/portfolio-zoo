import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'

export default function NotFound() {
  return (
    <PageTransition className="notfound">
      <p className="notfound__code">404</p>
      <h1>없는 페이지입니다.</h1>
      <Link to="/" className="btn btn--primary">
        홈으로
      </Link>
    </PageTransition>
  )
}
