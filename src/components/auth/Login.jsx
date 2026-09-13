// import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { openSignUp, closeAuth } from "../../store/slice/Uislice";
import { useState } from "react";
import { FacebookIcon, GithubIcon, GoogleIcon } from "../Icons/SocialIcons";
import { SocialButton } from "./SignUp";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../features/auth/authThunks";

const Login = () => {
  const dispatch = useDispatch();
  const preFillEmail = useSelector((state) => state.ui.LoginPreFill)
  
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    email: preFillEmail || "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const resultAction = await dispatch(loginUser(formData))

    if(loginUser.fulfilled.match(resultAction)){
      const user = resultAction.payload.data.user;
      dispatch(closeAuth());
      if(user.role === 'ADMIN'){
        navigate('/adminDashboard')
      }else{
        navigate('/dashboard')
      }
    }
  }
  return (
    <>
      <div className="mb-6 text-center">
        <h2 className="font-display text-2xl font-medium text-gray-900">
          Welcome back
        </h2>
        <p className="mt-1 text-sm text-gray-500">Log in to continue</p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-gray-900 focus:bg-white focus:ring-1 focus:ring-gray-900"
          />
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <button
              type="button"
              className="text-xs font-medium text-gray-500 hover:text-gray-900"
            >
              Forgot password?
            </button>
          </div>
          <input
            id="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-gray-900 focus:bg-white focus:ring-1 focus:ring-gray-900"
          />
        </div>

        <button
        // onClick={handleSubmit}
          type="submit"
          className="w-full rounded-xl bg-gray-900 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          Log in
        </button>
      </form>

      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-gray-200" />
        <span className="text-xs text-gray-400">or continue with</span>
        <div className="h-px flex-1 bg-gray-200" />
      </div>

      <div className="flex gap-3">
        <SocialButton icon={GoogleIcon} label="Google" />
        <SocialButton icon={GithubIcon} label="Github" />
        <SocialButton icon={FacebookIcon} label="Facebook" />
      
      </div>

      <p className="mt-6 text-center text-sm text-gray-500">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={() => dispatch(openSignUp())}
          className="font-medium text-gray-900 hover:underline cursor-pointer"
        >
          Sign up
        </button>
      </p>
    </>
  );
};

export default Login;
