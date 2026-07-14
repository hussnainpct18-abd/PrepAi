import React ,{useState}from 'react'
import '../style/button.css'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'
const Register = () => {

  const navigate=useNavigate();

  const{user,loading,handleLogin,handleLogout,handleRegister}=useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await handleRegister({ username, email, password });
    if (result) {
      navigate("/home");
    }
  }

  if(loading){
    return(<main><h1>Loading............</h1></main>)
  }

  return (
    <div className="flex justify-center items-center h-screen bg-[#0d0d0f] text-white px-4">
      <div className="w-full max-w-md p-8 bg-[#13131a] border border-[#1e1e2e] rounded-2xl shadow-xl flex flex-col gap-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold font-['Sora',sans-serif] text-white">
            Create an Account
          </h1>
          <p className="text-[#7e7e94] text-sm mt-2">Join us to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="username" className="text-[13px] font-semibold text-[#e2e2e8]">
              Username
            </label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              id="username"
              placeholder="username"
              className="bg-[#0d0d0f] border border-[#1e1e2e] focus:border-[#e0485a44] rounded-lg p-3 text-sm text-[#e2e2e8] placeholder:text-[#3e3e52] outline-none transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-[13px] font-semibold text-[#e2e2e8]">
              Email address
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              placeholder="Email"
              className="bg-[#0d0d0f] border border-[#1e1e2e] focus:border-[#e0485a44] rounded-lg p-3 text-sm text-[#e2e2e8] placeholder:text-[#3e3e52] outline-none transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-[13px] font-semibold text-[#e2e2e8]">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              placeholder="password"
              className="bg-[#0d0d0f] border border-[#1e1e2e] focus:border-[#e0485a44] rounded-lg p-3 text-sm text-[#e2e2e8] placeholder:text-[#3e3e52] outline-none transition-colors"
            />
          </div>

          <button
            type="submit"
            className="mt-2 bg-gradient-to-br from-[#e0485a] to-[#b83048] hover:opacity-90 text-white font-semibold py-3 rounded-full transition-all text-sm shadow-[0_4px_24px_#e0485a33]"
          >
            Submit
          </button>
        </form>
        <p className="text-center text-sm text-[#7e7e94]">
          Already have an account?{" "}
          <Link to={"/Login"} className="text-[#e0485a] hover:underline font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register