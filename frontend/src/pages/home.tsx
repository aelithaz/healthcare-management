import { useNavigate, Link } from "react-router-dom"

function Home() {
  return (
    <div className="pt-100">
      <header>
        <div>
          <p>
            This is the Home Page
          </p>
          <Link to="/testing"><button>To Testing</button></Link>
        </div>
      </header>
    </div>
  )
}
export default Home