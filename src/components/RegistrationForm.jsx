import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";


const FlexName = styled.div`
  display: flex;
  gap: 10px;
  background-color: black;
`;

const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [emailError, setEmailError] = useState("Email не може бути пустим");
  const [passwordError, setPasswordError] = useState(
    "Пароль не може бути пустим"
  );
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
        "Пароль повинен бути не меншу ніж 3 символи та не більше 8 символів"
      );
      if (!e.target.value) {
        setPasswordError("Пароль не може бути пустим");
      }
    } else {
      setPasswordError("");
    }
  };

  const blurHundler = (e) => {
    switch (e.target.name) {
      case "email":
        setEmailDirty(true);
        break;
      case "password":
        setPasswordDirty(true);
        break;
    }
  };

  return (
    <div className="app">
      <form>
        <h1>Регістрація</h1>
        {emailDirty && emailError && (
          <div style={{ color: "red" }}>{emailError}</div>
        )}
        <input
          onChange={(e) => emailHandler(e)}
          value={email}
          onBlur={(e) => blurHundler(e)}
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
          onBlur={(e) => blurHundler(e)}
          name="password"
          type="password"
          placeholder="Введіть ваш пароль..."
        />
        <button disabled={!formValid} type="submit">Registration</button>
      </form>
    </div>
  );
};

export default Registration;
