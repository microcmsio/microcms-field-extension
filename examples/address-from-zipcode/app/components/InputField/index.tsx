import styles from "./index.module.css";
import { Button } from "../Button";

type InputFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  withButton?: {
    label: string;
    onClick: () => void;
  };
  error?: string;
  size?: "small" | "medium" | "large";
};

export const InputField = ({
  label,
  value,
  onChange,
  placeholder,
  withButton,
  error,
  size = "medium",
}: InputFieldProps) => {
  return (
    <div className={styles.field}>
      <label className={styles.label}>{label}</label>
      <div className={withButton ? styles.inputGroup : undefined}>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`${styles.input} ${styles[size]}`}
        />
        {withButton && <Button onClick={withButton.onClick} label={withButton.label} />}
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};
