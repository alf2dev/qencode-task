import React, { useEffect } from "react";
import Header from "./components/Header";
import SocialLogin from "./components/SocialLogin";
import { Button } from "../ui/Button";
import { useCredentialData } from "../../services/providers/CredentialData";
import { refreshTokenRes } from "../../services/api/requests";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const [
    { access_token, refresh_token, refresh_token_expire, token_expire },
    setCretentialData,
  ] = useCredentialData();
  useEffect(() => {
    const now = Date.now();
    if (token_expire && token_expire * 1000 < now) {
      if (refresh_token_expire && refresh_token_expire * 1000 < now) {
        navigate("/");
      } else {
        refreshTokenRes({
          refresh_token,
        }).then(
          ({
            access_token,
            refresh_token,
            refresh_token_expire,
            token_expire,
          }) => {
            setCretentialData({
              access_token,
              refresh_token,
              refresh_token_expire,
              token_expire,
            });
          }
        );
      }
    } else if (!token_expire) {
      navigate("/");
    }
  }, [
    refresh_token,
    refresh_token_expire,
    token_expire,
    setCretentialData,
    navigate,
  ]);

  return (
    <>
      <Header title={"Hi"} />
      <SocialLogin />
      <Button
        styleType="standart"
        title="Exit"
        onClick={() => {
          setCretentialData({});
        }}
      />
    </>
  );
}
