import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 80px;
  background-color: #2b303a;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 25px;
  font-size: 24px;
  a {
    color: #fff;
    text-decoration: none;
    transition: all ease 0.3s;
    &: hover {
      opacity: 0.4;
    }
    &.active {
      text-decoration: underline;
    }
  }
`;

const Header = () => {
  const [active, setActive] = React.useState('login');

  React.useEffect(() => {
    const path = window.location.pathname.split('/')[2];
    if (!path) {
      return;
    }
    setActive(path);
  }, []);

  return (
    <>
      <Wrapper>
        <Link
          onClick={() => setActive('login')}
          className={active === 'login' ? 'active' : ''}
          to="authorization/login">
          Sign in
        </Link>
        <Link
          onClick={() => setActive('registration')}
          className={active === 'registration' ? 'active' : ''}
          to="authorization/registration">
          Sign up
        </Link>
      </Wrapper>
    </>
  );
};

export default Header;