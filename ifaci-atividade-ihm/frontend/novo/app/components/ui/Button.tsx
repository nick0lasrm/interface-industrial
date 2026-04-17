import { ReactNode } from "react";

interface IButton {
    style: keyof typeof variants
    name?: string;
    icon?: ReactNode;
    type?: "button" | "submit" | "reset"
    className?: string;
    onClick?: () => void
}

const variants = {
    addDevice: "gap-3 bg-[#22C38E] hover:bg-[#21a77a] py-2 px-4 rounded-md text-black",
    submit: "bg-[#22C38E] hover:bg-[#21a77a] py-2.5 px-4 rounded-md text-black justify-center",
    close: "bg-trasparent text-[#A5ABB0] hover:text-white",
    ghost: "hover:bg-[#22c38d4b] hover:text-[#FFFFFF] items-center justify-center rounded-md"
}

export default function Button({ name, icon, style, type, className, onClick }: IButton) {
    const selectedStyle = variants[style]
    return (
        <button
            className={`flex items-center cursor-pointer ${selectedStyle} ${className || ""}`}
            type={type}
            onClick={onClick}>
            {icon}
            <span>{name}</span>
        </button>
    )
}