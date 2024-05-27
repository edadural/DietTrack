import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "components/fields/InputField";
import Checkbox from "components/checkbox";
import { appAxios } from "helper/appAxios";

export default function SignInAdmin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    appAxios
      .post("auth/admin-login", {
        username: username,
        password: password
      })
      .then(async (response) => {
        if (response.data.status) {
          localStorage.setItem("token", response.data.data.token);
          localStorage.setItem("username", response.data.data.username);
          navigate("/admin/default");
        }
      })
      .catch((err) => { });
  };

  return (
    <div className="flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {/* Sign in section */}
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-5 text-4xl font-bold text-navy-700 dark:text-white text-center">
          Giriş Yap / Admin
        </h4>
        <form onSubmit={handleSubmit}>
          {/* username */}
          <InputField
            variant="auth"
            extra="mb-3"
            label="Kullanıcı Adı*"
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          {/* Password */}
          <InputField
            variant="auth"
            extra="mb-3"
            label="Password*"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* Checkbox */}
          <div className="mb-4 flex items-center justify-between px-2">
            <div className="flex items-center">
              <Checkbox />
              <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
                Beni hatırla
              </p>
            </div>
            <a
              className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
              href=" "
            >
              Şifremi unuttum
            </a>
          </div>
          <button
            type="submit"
            className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
          >
            Giriş Yap
          </button>
        </form>
      </div>
    </div>
  );
}
