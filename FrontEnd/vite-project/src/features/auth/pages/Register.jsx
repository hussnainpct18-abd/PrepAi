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
    <>
      <div className="d-flex justify-content-center align-items-center gap-3 vh-100 text-white ">

        <div className="p-4 bg-dark text-white rounded" style={{ width: "400px" }}>
          <h1 className="text-center">Register</h1>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputName1" className="form-label">
                Username
              </label>
              <input
              onChange={(e)=>{setUsername(e.target.value)}}
                type="text"
                className="form-control"
                id="exampleInputName1"
                placeholder='username'
              />

            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
              onChange={(e)=>{setEmail(e.target.value)}}
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder='Email'
              />

            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
              onChange={(e)=>{setPassword(e.target.value)}}
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder='password'
              />
            </div>


            <button type="submit" className="btn btn-primary w-100 submit">
              Submit
            </button>
          </form>
          <p className='mt-4'>Already have an account? <Link to={"/Login"}>Login</Link></p>

        </div>

      </div>
      )

    </>
  )
}

export default Register