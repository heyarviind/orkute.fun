import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [errors, setErrors] = useState({});

  const register = (e) => {
    e.preventDefault();
    let errors = {};

    const { email, password, username } = e.target;

    if (!email.value) {
      errors.email = "Email is required";
    }

    if (!password.value) {
      errors.password = "Password is required";
    }

    if (!username.value) {
      errors.username = "Username is required";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    axios
      .post("/api/auth/register", {
        email: email.value,
        password: password.value,
        username: username.value,
      })
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <section className="h-full flex justify-center items-center flex-col max-w-4xl w-full mx-auto">
      <div className="flex items-center flex-col md:flex-row justify-center space-x-0 md:space-x-2">
        <div className="flex-1 bg-white border-4 border-gray-50 p-6 h-full flex items-center justify-center">
          <div>
            <img src="/logo.svg" className="w-60 mx-auto" />

            <div className="text-center mt-6">
              <div className="mb-2">
                <span className="text-[#ED2590] font-bold">Connect </span>with
                your friends and family using scraps and instant messaging
              </div>
              <div className="mb-2">
                <span className="text-[#ED2590] font-bold">Dsicover </span>new
                people through friends of friends and communities
              </div>
              <div className="mb-2">
                <span className="text-[#ED2590] font-bold">Share </span>your
                videos, pictures, and passions all in one place
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-80">
          <form
            className="bg-[#e8eefa] border-4 border-white p-2 py-4"
            onSubmit={register}
          >
            <div className="text-center">Reserve your username</div>

            <div className="grid grid-cols-3 gap-2 mt-6">
              <span className="text-right">Email: </span>
              <span className="col-span-2">
                <input
                  className="border border-gray-300"
                  type="email"
                  required="true"
                  name="email"
                />
                <br></br>
                <small className="text-sm text-gray-500">
                  ex: modi@example.com
                </small>
              </span>

              <span className=" text-right">Username:</span>
              <span className="col-span-2">
                <input
                  className={`border border-gray-300 ${errors?.username ? 'border-red-500' : ''}`}
                  type="text"
                  required="true"
                  name="username"
                />
              </span>

              <span className=" text-right">Password:</span>
              <span className="col-span-2">
                <input
                  className="border border-gray-300"
                  type="password"
                  required
                  name="password"
                />
              </span>

              <span className=" text-right"></span>
              <span className="col-span-2">
                <label>
                  <input type="checkbox" /> Remember me on this computer
                </label>

                <small className="text-sm text-gray-500 block mt-2">
                  Do not use on public computers
                </small>
              </span>

              <span className="col-span-1"></span>
              <span className="col-span-2">
                <button
                  type="submit"
                  className="border border-gray-300 rounded-lg bg-gradient-to-t from-gray-100 text-sky-500 text-sm font-bold to-gray-50 px-2 py-0.5"
                >
                  Register
                </button>
              </span>
            </div>
          </form>

          <div className="bg-[#e8eefa] border-4 border-white p-2 py-4 mt-2">
            <div className="text-center">Already have an account?</div>

            <span className="text-blue-600 font-bold text-lg uppercase underline block text-center">
              Log In
            </span>
          </div>
        </div>
      </div>
      <div className="bg-[#bccde9] p-2 w-full text-center mt-2">
        Made by{" "}
        <a
          target="_blank"
          className="text-blue-700 hover:underline"
          href="https://twitter.com/heyarviind"
        >
          @heyarviind
        </a>
      </div>
    </section>
  );
}
