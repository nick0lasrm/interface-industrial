export default function Switch({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
    return (
        <div
            onClick={onToggle}
            className={`w-11 h-6 rounded-full cursor-pointer items-center flex transition-colors ${enabled ? "bg-[#22C38E]" : "bg-[#2B303B]"}`}
        >
            <div
                className={`w-5.5 h-5.5 bg-[#14181F] rounded-full shadow-md transform transition-transform ${enabled ? "translate-x-5" : "translate-x-0.5"}`}
            />
        </div>
    )
}