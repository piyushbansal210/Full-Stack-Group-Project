import { forwardRef } from "react"

type InputProps = { label?: string } & React.InputHTMLAttributes<HTMLInputElement>


const Input = forwardRef<HTMLInputElement, InputProps>(({ label, placeholder, type, ...inputProps }, ref) => {
    return (
        <div className="flex flex-col gap-2 items-start">
            {label && <label className='text-sm font-bold' >{label}</label>}
            <input className='p-2 border border-gray-800 rounded-md' type={type} placeholder={placeholder} ref={ref} {...inputProps} />
        </div>
    )   
})

Input.displayName = 'Input';
export default Input;