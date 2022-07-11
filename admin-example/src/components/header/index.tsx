import { Link } from "react-router-dom"
import SearchBar from "./SearchBar"

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/Cats">  NDK</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/Cats">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Cats">Cats</Link>
            </li>
            
          </ul>
          <SearchBar />
        </div>
      </div>
    </nav>
  )
}
export default Header