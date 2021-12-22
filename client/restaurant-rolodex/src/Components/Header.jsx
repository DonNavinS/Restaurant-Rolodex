import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav>
      <ul>
        <li>
          <Link className="link" to="/total">
            TOTAL
          </Link>
          <Link className="link" to="/tried">
            TRIED
          </Link>
          <Link className="link" to="/home">
            HOME
          </Link>
          <Link className="link" to="/signup">
            SIGNUP
          </Link>
        </li>
      </ul>
    </nav>
  );
}
