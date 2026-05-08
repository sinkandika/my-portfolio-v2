import { useState } from "react"
import { loginAdmin } from "../../services/authService";
import { useNavigate } from "react-router-dom";

function LoginAdmin () {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navi = useNavigate();

  // handle login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await loginAdmin({
        email,
        password,
      });

      localStorage.setItem("token", data.token); // save token and become authorized after login

      console.log(data);
      alert("Login Success");
      navi("/dashboard");
    } catch (err) {
      console.log(err);
      alert("Login failed");
    }
  } ;

  return (
    <>
    <p>Login</p>

    <form onSubmit={handleLogin}>
      <input 
      type="text"
      placeholder="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)} 
      className="border"
      />
      <input 
      type="password"
      placeholder="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="border" 
      />
      <button type="submit" className="border">
        submit
      </button>
    </form>
    </>
  )
};

export default LoginAdmin;