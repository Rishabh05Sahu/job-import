interface Props {
  value: number;
  variant?: "success" | "warning" | "danger";
}

export default function Badge({ value, variant = "success" }: Props) {
  const styles = {
    success: "bg-green-100 text-green-700",
    warning: "bg-yellow-100 text-yellow-700",
    danger: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[variant]}`}
    >
      {value}
    </span>
  );
}
