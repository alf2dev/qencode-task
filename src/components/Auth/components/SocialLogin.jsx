import React from "react";
import google from "./../icons/google.svg";
import github from "./../icons/github.svg";
import styles from "./../Auth.module.css";

export default function SocialLogin() {
  return (
    <>
      <div className={styles.socialLogins}>
        <button>
          <img src={google} alt="" />
          Google
        </button>
        <button>
          <img src={github} alt="" />
          Github
        </button>
      </div>
      <span className={styles.separator}>OR</span>
    </>
  );
}
