import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container">
      <h1>CampusConnect</h1>

      <p>
        Welcome to the Student Activity Management Portal.
      </p>

      <div>
        <Link to="/login">
          <button>Login</button>
        </Link>

        <Link to="/register">
          <button>Register</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;