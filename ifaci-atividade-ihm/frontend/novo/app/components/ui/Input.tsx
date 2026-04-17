interface IInput {
    placeholder?: string;
    label?: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    type?: "" | "text" | "number" | "password";
    step?: string;
}

export default function Input({ placeholder, label, value, onChange, className, type, step }: IInput) {
    return (
        <div className="flex flex-col">
            <label className="font-semibold mb-2 text-sm">{label}</label>
            <input
                className={`font-mono text-sm text-[#7b878f] bg-[#14181F] px-3 py-2.5 rounded-md border border-[#252b33] w-full focus:outline-none focus:ring-1 focus:ring-[#22C38E] ${className || ''}`}
                type={type}
                placeholder={placeholder}
                step={step}
                value={value}
                onChange={onChange}
            />
        </div>
    )
}