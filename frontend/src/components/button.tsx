import { forwardRef } from "react";

type ButtonProps = {
    children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>   

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ children, ...props }, ref) => {
    return (
        <button className='p-2 bg-blue-500 text-white rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-auto' ref={ref} {...props}>
            {children}
        </button>
    )
})

Button.displayName = 'Button';
export default Button;