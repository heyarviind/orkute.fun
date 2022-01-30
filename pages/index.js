import { useState } from "react";
import Head from "next/head";
import axios from "axios";

export default function Home() {
  const [errors, setErrors] = useState({});
  const [reserved, setReserved] = useState(false);
  const [serverError, setServerError] = useState(null);

  const register = (e) => {
    e.preventDefault();
    let errors = {};

    const { email, password, username } = e.target;

    if (!email.value) {
      errors.email = "Email is required";
    }

    // if (!password.value) {
    //   errors.password = "Password is required";
    // }

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
        // password: password.value,
        username: username.value,
      })
      .then((res) => {
        console.log(res);
        setReserved(true);
      })
      .catch((err) => {
        setServerError(err.response.data.message);
      });
  };

  const description = "Bringing back orkut to life";
  const title = "Orkute - Register";
  const url = "https://orkute.fun";
  const image = "/og-image.png"

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:type" content="website" />
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta name="description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <section className="h-full flex justify-center items-center flex-col max-w-4xl w-full mx-auto">
        {reserved && (
          <div className="shadow rounded-lg bg-yellow-50 p-1.5 w-full mb-2 border-4 border-white px-2">
            Your username has been reserved
          </div>
        )}
        <div className="flex items-center flex-col md:flex-row justify-center space-x-0 md:space-x-2">
          <div className="order-2 md:order-1 flex-1 bg-white border-4 border-gray-50 p-6 h-full flex items-center justify-center">
            <div>
              <img src="/logo.svg" className="w-60 mx-auto" />

              <div className="text-center py-2 underline">
                We are coming soon! Reserve your username now
              </div>

              <div className="text-center mt-6">
                <div className="mb-2">
                  <span className="text-[#ED2590] font-bold">Connect </span>with
                  your friends and family using scraps and instant messaging
                </div>
                <div className="mb-2">
                  <span className="text-[#ED2590] font-bold">Discover </span>new
                  people through friends of friends and communities
                </div>
                <div className="mb-2">
                  <span className="text-[#ED2590] font-bold">Share </span>your
                  videos, pictures, and passions all in one place
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2 w-full md:w-80">
            <form
              className="bg-[#e8eefa] border-4 border-white p-2 py-4"
              onSubmit={register}
            >
              <div className="text-center">
                Reserve your username [<a>?</a>]
              </div>

              {serverError && (
                <small className="text-red-600">{serverError}</small>
              )}

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
                    className={`border border-gray-300 ${
                      errors?.username ? "border-red-500" : ""
                    }`}
                    type="text"
                    required="true"
                    name="username"
                  />
                </span>

                {/* <span className=" text-right">Password:</span>
                <span className="col-span-2">
                  <input
                    className="border border-gray-300"
                    type="password"
                    required
                    name="password"
                  />
                </span> */}

                {/* <span className="text-right"></span> */}
                {/* <span className="col-span-2">
                  <label>
                    <input type="checkbox" /> Remember me on this computer
                  </label>

                  <small className="text-sm text-gray-500 block mt-2">
                    Do not use on public computers
                  </small>
                </span> */}

                <span className="col-span-1"></span>
                <span className="col-span-2">
                  <button
                    type="submit"
                    className="border border-gray-300 rounded-lg bg-gradient-to-t from-gray-100 text-sky-500 text-sm font-bold to-gray-50 px-2 py-0.5"
                  >
                    Register
                  </button>
                </span>

                <small className="col-span-3 mt-2">
                  We are collecting emails and usernames, once we are live we
                  will notify you via email.
                </small>
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
        <div className="bg-[#bccde9] p-2 w-full text-center mt-2 text-sm">
          Brought to you by{" "}
          <a
            target="_blank"
            className="text-blue-700 hover:underline"
            href="https://twitter.com/heyarviind"
          >
            @heyarviind
          </a>
        </div>
        <small className="text-gray-500 mt-1">
          Disclaimer: This is a fan-based project and is not affiliated with
          Orkut.com in any way.
        </small>
      </section>
    </>
  );
}
