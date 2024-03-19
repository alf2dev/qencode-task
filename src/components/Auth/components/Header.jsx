import React from "react";
import styles from "./../Auth.module.css";
import logo from "./../icons/logo.svg";

export default function Header({ title }) {
  return (
    <>
      <img className={styles.logo} src={logo} alt="" />
      <span className={styles.title}>{title && title}</span>
    </>
  );
}
