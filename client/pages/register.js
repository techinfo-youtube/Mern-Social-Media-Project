import React, { useState, useContext } from "react";
import { UserContext } from "../context";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "./../components/Layout/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [state, setState] = useContext(UserContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/register`,
        {
          name,
          email,
          password,
          answer,
        }
      );
      setLoading(false);
      toast.success("User Register Successfully");
      router.push("/login");
    } catch (error) {
      toast.error(error.response.data);
    }
  };
  if (state && state.token) router.push("/");
  return (
    <Layout>
      <div className="row d-flex align-items-center justify-content-center mb-4">
        <div className="col-md-8">
          <h1 className="p-3 text-center">Register Page</h1>
          <form>
            <ToastContainer
              position="top-center"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            <div className="mb-3">
              <label htmlFor="exampleInputName1" className="form-label">
                Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="form-control"
                id="exampleInputName1"
                aria-describedby="nameHelp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <select
              className="form-select"
              defaultValue={"DEFAULT"}
              aria-label="Default select example"
            >
              <option value="DEFAULT">Security Question</option>
              <option value={1}>Enter You Favrite Food Name ?</option>
              <option value={2}>Enter Your Favrite Sports ?</option>
              <option value={3}>Enter Your Best Friend Name ?</option>
            </select>
            <div className="mb-3">
              <input
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                type="text"
                placeholder="Answer here"
                className="form-control"
                id="exampleInputAnswer1"
                aria-describedby="nameHelp"
              />
            </div>
            <div className="d-flex flex-row">
              <button
                type="submit"
                onClick={handleSubmit}
                className="btn btn-primary btn-lg"
                disabled={!name || !password || !email || !answer}
              >
                {loading ? (
                  <>
                    <span>Loading &nbsp;</span>
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  </>
                ) : (
                  "Register"
                )}
              </button>
              <p className="m-3">
                Already Registerd ?<Link href="/login">Login !</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default register;
