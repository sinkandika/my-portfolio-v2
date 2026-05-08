import { useState } from "react"
import { registerAdmin } from "../../services/authService";


function RegisterAdmin () {
  const [name, setName] = useState ("");
  const [email, setEmail] = useState ("");
  const [password,setPassword] = useState("");

  // handle register
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const data = await registerAdmin({
        name,
        email,
        password,
      });

      console.log(data);
      alert("Register success!");
    } catch (error) {
      console.log(error);
      alert("Register failed");
    }
  };

  return (
    <>
    <form onSubmit={handleRegister}>
      <input
      type="text"
      placeholder="name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="border" 
      />
      <input
      type="email"
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

export default RegisterAdmin;