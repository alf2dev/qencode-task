import React, { useMemo, useState } from "react";
import classNames from "classnames";
import styles from "./Input.module.css";
import eye from "./icons/eye.svg";

export const Input = (props) => {
  const {
    label,
    inputProps: { className, id, type: initType, ...restInputProps },
  } = props;
  const [type, setType] = useState(initType);
  const iconsProps = useMemo(
    () => ({
      password: {
        src: eye,
        onMouseDown: () => setType("text"),
        onMouseUp: () => setType("password"),
        className: styles.eyeIcon,
      },
    }),
    []
  );
  const iconProps = useMemo(() => iconsProps[type], [iconsProps, type]);
  return (
    <div className={classNames(styles.inputContainer, className)}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <div className={styles.inputBox}>
        <input
          id={id}
          className={styles.input}
          type={type}
          {...restInputProps}
        />
        {iconProps && <img {...iconProps} alt=""></img>}
      </div>
    </div>
  );
};
