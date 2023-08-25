import React, { useState, useEffect } from "react";
import styled from "styled-components";

const FlexName = styled.div`
  display: flex;
  gap: 10px;
  background-color: black;
`;

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (emailError || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailError, passwordError]);

  const emailHandler = (e) => {
    setEmail(e.target.value);
    const re =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError("Некоректний email");
    } else {
      setEmailError("");
    }
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 3 || e.target.value.length > 8) {
      setPasswordError(
        "Пароль повинен бути не менше 3 символи та не більше 8 символів"
      );
      if (!e.target.value) {
        setPasswordError("Пароль не може бути пустим");
      }
    } else {
      setPasswordError("");
    }
  };

  const blurHandler = (e) => {
    switch (e.target.name) {
      case "email":
        setEmailDirty(true);
        break;
      case "password":
        setPasswordDirty(true);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formValid) {
        const mockUser = {
        email: "example@example.com",
        password: "123456",
      };
  
          if (email === mockUser.email && password === mockUser.password) {
        alert("Успішна авторизація");
      } else {
        alert("Помилка авторизації: неправильний email або пароль");
      }
    }
  };
  

  return (
    <div className="app">
      <form onSubmit={handleSubmit}>
        <h1>Вхід</h1>
        {emailDirty && emailError && (
          <div style={{ color: "red" }}>{emailError}</div>
        )}
        <input
          onChange={(e) => emailHandler(e)}
          value={email}
          onBlur={(e) => blurHandler(e)}
          name="email"
          type="text"
          placeholder="Введіть ваш email..."
        />
        {passwordError && passwordDirty && (
          <div style={{ color: "red" }}>{passwordError}</div>
        )}
        <input
          onChange={(e) => passwordHandler(e)}
          value={password}
          onBlur={(e) => blurHandler(e)}
          name="password"
          type="password"
          placeholder="Введіть ваш пароль..."
        />
        <button disabled={!formValid} type="submit">Вхід</button>
      </form>
    </div>
  );
};

export default LoginForm;
