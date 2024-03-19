import React, { useRef, useState } from "react";
import Header from "./components/Header";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import styles from "./Auth.module.css";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
export default function ForgotPassword() {
  const passInputRef = useRef();
  const navigate = useNavigate();
  const [token, setToken] = useState();
  const [emailStatus, setEmailStatus] = useState(false);
  const onEmailChange = (event) => {
    const reg = /^([A-Za-z0-9_\-+\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    setEmailStatus(() => reg.test(event.target.value));
  };
  return (
    <>
      <Header title={"Forgot Password?"} />

      <Input
        inputProps={{
          ref: passInputRef,
          type: "email",
          placeholder: "Enter your email",
          id: "email",
          className: styles.inputMargin,
          onChange: onEmailChange,
        }}
      />
      <Button
        title="Send"
        styleType="standart"
        onClick={async () => {
          const token = uuidv4();
          localStorage.setItem("token", token);
          setTimeout(() => {
            localStorage.removeItem("token");
          }, 15 * 60 * 1000);
          setToken(token);
        }}
        buttonProps={{
          className: !emailStatus && styles.disabledButton,
          disabled: !emailStatus,
        }}
      />

      <Button
        title="Cancel"
        styleType="reverseColor"
        onClick={() => {
          navigate("/");
        }}
      />

      {token && (
        <div className={styles.testReset}>
          Send Email URL with Reset Pass (Demo):{" "}
          <Link to={`${window.location.origin}/set-password?token=${token}`}>
            link
          </Link>
        </div>
      )}
    </>
  );
}
