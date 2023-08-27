import React, { useState, useEffect } from "react";
import styled from "styled-components";

const RegistrationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${(props) => props.backgroundColor || "#fff"};
`;

const RegistrationContainer = styled.div`
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

const RegistrationForm = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const firstNameHandler = (e) => {
    setFirstName(e.target.value);
  };

  const lastNameHandler = (e) => {
    setLastName(e.target.value);
  };

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

 
  const handleRegistration = (e) => {
    e.preventDefault();
    if (emailError === "" && passwordError === "" && firstName && lastName) {
      const user = {
        firstName,
        lastName,
        email,
        password: rememberMe ? password : "",
      };
      localStorage.setItem("user", JSON.stringify(user));
      setRegistrationSuccess(true);
    } else {
      
      alert("Будь ласка, заповніть всі обов'язкові поля коректно.");
    }
  };

  const isFormValid = emailError === "" && passwordError === "";

  return (
    <RegistrationWrapper backgroundColor="black">
      <RegistrationContainer>
        {registrationSuccess ? (
          <div style={{ textAlign: "center" }}>
            <h1>Реєстрація успішна!</h1>
            <p>Ви можете ввійти з використанням ваших облікових даних.</p>
          </div>
        ) : (
          <div className="app">
            <form onSubmit={handleRegistration}>
              <h1>Реєстрація</h1>
              <div>
              <input
                onChange={firstNameHandler}
                value={firstName}
                name="firstName"
                type="text"
                placeholder="Ім'я"
              />
              </div>
              <div>
              <input
                onChange={lastNameHandler}
                value={lastName}
                name="lastName"
                type="text"
                placeholder="Прізвище"
              />
              </div>
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
              <div>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={handleRememberMe}
                />
                <label>Запам'ятати мене</label>
              </div>
              <button  disabled={!isFormValid} type="submit">
                Реєстрація
              </button>
            </form>
          </div>
        )}
      </RegistrationContainer>
    </RegistrationWrapper>
  );
};

export default RegistrationForm;
