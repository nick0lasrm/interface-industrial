import { Activity, Monitor} from "lucide-react"
import { Device } from "../types/device";

interface IHeaderProps {
    onlineCount?: number;
    warningCount?: number;
    deviceCount?: number;
    devices?: Device[];
}

export default function Header({ onlineCount, warningCount, deviceCount}: IHeaderProps) {

    return (
        <div className="w-full border-b border-b-gray-600 px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="bg-[#152A2A]  p-3 rounded-2xl">
                        <Monitor className="h-5 w-5 text-[#22C38E]" />
                    </div>

                    <div className="flex flex-col">
                        <h1 className="text-xl font-bold">Painel IHM</h1>
                        <p className="font-mono text-xs text-[#6F7D85]">Sistema de Monitoramento Industrial</p>
                    </div>
                </div>

                <div className="flex gap-5 items-center">
                    <span className="font-mono text-xs flex items-center gap-1.5 text-[#6F7D85]"><div className="status-dot status-online"></div> {onlineCount} online</span>
                    {(warningCount ?? 0) > 0 && (
                        <span className="font-mono text-xs text-[#ff9900] flex gap-2 items-center">
                            <Activity size={15} />
                            {warningCount} alerta(s)
                        </span>
                    )}
                    <span className="font-mono text-xs text-[#6F7D85]">{deviceCount} dispositivos</span>
                </div>
            </div>
        </div>
    )
}