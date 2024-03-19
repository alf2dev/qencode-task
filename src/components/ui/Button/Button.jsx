import React, { useMemo } from "react";
import styles from "./Button.module.css";
import classNames from "classnames";

export const Button = (props) => {
  const {
    title,
    styleType,
    onClick,
    buttonProps: { className, ...restButtonProps } = {},
  } = props;
  const buttonType = useMemo(
    () => ({
      standart: {
        styleClass: styles.standart,
      },
      reverseColor: {
        styleClass: styles.reverseColor,
      },
    }),
    []
  );
  return (
    <button
      className={classNames(
        styles.button,
        buttonType[styleType].styleClass,
        className
      )}
      {...restButtonProps}
      onClick={onClick}
    >
      {title}
    </button>
  );
};
