import "./Button.css";

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "submit" | "reset" | "button" | undefined;
  disabled?: boolean;
}

export function Button({ children, onClick, type, disabled }: Props) {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className="button"
    >
      {children}
    </button>
  );
}
