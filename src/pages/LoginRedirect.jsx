import { useNavigate } from "react-router-dom"

const LoginRedirect = () => {
  const navigate =  useNavigate( )
  return (
    <div className="login-redirect-page">
      <button className="login-redirect-btn" onClick={() => navigate("/login")}>
        Hey, it seems you have not logged in yet 🤔 <br/>
        Click me if you want so..
      </button>
      <p className="redirect-float">
        Please login
      </p>
    </div>
  );
}

export default LoginRedirect