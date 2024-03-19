import React, { useRef, useState } from "react";
import { Input } from "../ui/Input";
import styles from "./Auth.module.css";
import Header from "./components/Header";
import SocialLogin from "./components/SocialLogin";
import { Button } from "../ui/Button";
import { loginRes } from "../../services/api/requests";
import { useCredentialData } from "../../services/providers/CredentialData";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [emailStatus, setEmailStatus] = useState(false);
  const onEmailChange = (event) => {
    const reg = /^([A-Za-z0-9_\-+\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    setEmailStatus(() => reg.test(event.target.value));
  };
  const emailInputRef = useRef();
  const passInputRef = useRef();
  const [passError, setPassError] = useState(false);

  const [_, setCretentialData] = useCredentialData();

  const navigate = useNavigate();

  return (
    <>
      <Header title={"Log in to your account"} />
      <SocialLogin />
      <Input
        inputProps={{
          ref: emailInputRef,
          type: "email",
          placeholder: "Work email",
          id: "email",
          className: styles.inputMargin,
          onChange: onEmailChange,
        }}
      />
      {emailStatus && (
        <>
          <Input
            inputProps={{
              ref: passInputRef,
              type: "password",
              placeholder: "Password",
              onChange: () => {
                setPassError(false);
              },
              className: passError && styles.error,
            }}
          />
          <span
            className={styles.forgot}
            onClick={() => {
              navigate("/forgot-password");
            }}
          >
            Forgot your password?
          </span>
        </>
      )}
      <Button
        title="Log in to Qencode"
        styleType="standart"
        onClick={async () => {
          if (passInputRef.current) {
            const password = passInputRef.current.value;
            if (password.length >= 8) {
              setPassError(false);
              const response = await loginRes({
                email: emailInputRef.current?.value,
                password,
              });
              if (response.data) {
                const {
                  access_token,
                  refresh_token,
                  refresh_token_expire,
                  token_expire,
                } = response.data;
                setCretentialData({
                  access_token,
                  refresh_token,
                  refresh_token_expire,
                  token_expire,
                });
                navigate("/profile");
              }
            } else {
              setPassError(true);
            }
          }
        }}
        buttonProps={{
          className: !emailStatus && styles.disabledButton,
          disabled: !emailStatus,
        }}
      />
      <div className={styles.signUp}>
        <span>Is your company new to Qencode? </span>
        <span>Sign up</span>
      </div>
    </>
  );
}
