import React, { useEffect, useRef, useState } from "react";
import styles from "./Auth.module.css";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import Header from "./components/Header";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { passwordResetRes } from "../../services/api/requests";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const urlToken = searchParams.get("token");
  const storedToken = localStorage.getItem("token");
  const isValidToken = urlToken === storedToken;
  const navigate = useNavigate();
  const passInputRef = useRef();
  const passConfirmInputRef = useRef();
  const [buttonStatus, setbuttonStatus] = useState(false);
  const onPasswordChange = () => {
    setbuttonStatus(true);
  };

  useEffect(() => {
    if (!isValidToken) {
      navigate("/");
    }
  }, [isValidToken]);
  const [error, setError] = useState("");
  if (!isValidToken) {
    return null;
  }
  const changePassword = async () => {
    if (isValidToken) {
      const pass = passInputRef.current.value;
      const passConfirm = passConfirmInputRef.current.value;
      if (!pass || !passConfirm) {
        return;
      }
      if (pass.length < 8) {
        setError("Password should be at least 8 characters long.");
        return;
      }
      if (pass !== passConfirm) {
        setError("Passwords do not match");
        return;
      }
      const response = await passwordResetRes({
        token: urlToken,
        secret: "",
        password: pass,
        password_confirm: passConfirm,
      });
      navigate("/");
    }
  };
  return (
    <>
      <Header title={"Create new Password?"} />
      <Input
        inputProps={{
          ref: passInputRef,
          type: "password",
          placeholder: "Password",
          className: styles.inputMargin,
          onChange: onPasswordChange,
        }}
        label="Password"
      />
      <Input
        inputProps={{
          ref: passConfirmInputRef,
          type: "password",
          placeholder: "Password",
          className: styles.inputMargin,
        }}
        label="Confirm Password"
      />
      {error && <span className={styles.resetError}>{error}</span>}
      <Button
        title="Reset Password"
        styleType="standart"
        onClick={changePassword}
        buttonProps={{
          className: !buttonStatus && styles.disabledButton,
          disabled: !buttonStatus,
        }}
      />
    </>
  );
}
