import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

export const Nav: FC = () => {
  return (
    <ul className="nav">
      <li className="nav__item">
        <NavLink className="nav__link" to="/portfolio">
          Portfolio
        </NavLink>
      </li>
      <li className="nav__item">
        <NavLink className="nav__link" to="/">
          About
        </NavLink>
      </li>
      <li className="nav__item">
        <NavLink className="nav__link" to="/">
          Contact
        </NavLink>
      </li>
    </ul>
  );
};
