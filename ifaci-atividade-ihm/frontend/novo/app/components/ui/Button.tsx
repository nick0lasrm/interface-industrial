import { ReactNode } from "react";

interface IButton {
    name: string;
    icon?: ReactNode
}

export default function Button({ name, icon }: IButton) {
    return (
        <button
            className="flex items-center gap-3 bg-[#22C38E] hover:bg-[#13e49f] cursor-pointer py-3 px-5 rounded-md text-black"
            type="button">
            {icon}
            <span>{name}</span>
        </button>
    )
}