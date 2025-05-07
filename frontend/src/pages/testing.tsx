import { useNavigate, Link } from "react-router-dom"

function Testing(){
  return(
    <div>
      <p>
        Hello, this is Testing Page
      </p>
      <Link to="/"><button>Back Home</button></Link>
    </div>

    
  )
}
export default Testing