import React, { useState, useEffect } from "react";
import styled from "styled-components";

const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${(props) => props.backgroundColor || "#fff"};
`;

const LoginContainer = styled.div`
  padding: 20px;
  border: 1px solid #ccc;
  background-color: grey;
  border-radius: 10px;
  animation: fadeIn 0.5s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const validateEmail = (email) => {
  return emailRegex.test(email.toLowerCase());
};

const validatePassword = (password) => {
  if (password.length === 0) {
    return "Пароль не може бути порожнім";
  } else if (password.length < 3 || password.length > 8) {
    return "Пароль повинен містити від 3 до 8 символів";
  }
  return "";
};

const LoginForm = () => {
  const savedUser = JSON.parse(localStorage.getItem("user")) || {};
  const [email, setEmail] = useState(savedUser.email || "");
  const [password, setPassword] = useState(savedUser.password || "");
  const [rememberMe, setRememberMe] = useState(!!savedUser.email);
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const emailHandler = (e) => {
    setEmail(e.target.value);
    setEmailDirty(true);
    if (!validateEmail(e.target.value)) {
      setEmailError("Некоректний email");
    } else {
      setEmailError("");
    }
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
    setPasswordDirty(true);
    setPasswordError(validatePassword(e.target.value));
  };

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (emailError === "" && passwordError === "") {
      const savedUser = JSON.parse(localStorage.getItem("user")) || {};

      if (email === savedUser.email && password === savedUser.password) {
        alert("Успішна авторизація");
      } else {
        alert("Помилка авторизації: неправильний email або пароль");
      }
    }
  };

  const isFormValid = emailError === "" && passwordError === "";

  useEffect(() => {
    if (rememberMe) {
      const user = {
        email,
        password,
      };
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [rememberMe, email, password]);

  useEffect(() => {
    setEmail(savedUser.email || "");
    setPassword(savedUser.password || "");
  }, [savedUser.email, savedUser.password]);

  return (
    <LoginWrapper backgroundColor='black'>
      <LoginContainer>
        <div className="app">
          <form onSubmit={handleSubmit}>
            <h1>Вхід</h1>
            {emailDirty && emailError && <div style={{ color: "red" }}>{emailError}</div>}
            <div>
            <input
              onChange={emailHandler}
              value={email}
              onBlur={() => setEmailDirty(true)}
              name="email"
              type="text"
              placeholder="Введіть ваш email..."
            />
            </div>
            {passwordError && passwordDirty && (
              <div style={{ color: "red" }}>{passwordError}</div>
            )}
            <div>
            <input
              onChange={passwordHandler}
              value={password}
              onBlur={() => setPasswordDirty(true)}
              name="password"
              type="password"
              placeholder="Введіть ваш пароль..."
            />
            </div>
            <button disabled={!isFormValid} type="submit">
              Вхід
            </button>
          </form>
        </div>
      </LoginContainer>
    </LoginWrapper>
  );
};

export default LoginForm;
