import styles from "./index.module.css";

type ButtonProps = {
  onClick: () => void;
  label: string;
  type?: "button" | "submit" | "reset";
};

export const Button = ({ onClick, label, type = "button" }: ButtonProps) => {
  return (
    <button onClick={onClick} type={type} className={styles.button}>
      {label}
    </button>
  );
};
