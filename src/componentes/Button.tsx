import '../styles/button.scss'
import { ButtonHTMLAttributes } from "react"

// passando propriedades opcionais para um componente
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
};

export function Button({ isOutlined = false, ...props }: ButtonProps) {
  return (

    <button
      className={`button ${isOutlined ? 'outlined' : ''}`}
      {...props}
    />
  )
}