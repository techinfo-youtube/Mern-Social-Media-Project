import React, { useState } from "react";
import Layout from "./../components/Layout/index";
import axios from "axios";
const register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/register", {
        name,
        email,
        password,
        answer,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <Layout>
      <div className="row d-flex align-items-center justify-content-center mb-4">
        <div className="col-md-8">
          <h1 className="p-3 text-center">Register Page</h1>
          <form>
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
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn btn-primary"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default register;
