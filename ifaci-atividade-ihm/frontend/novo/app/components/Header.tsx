import { Monitor, Plus } from "lucide-react"
import Button from "./ui/Button"


export default function Header() {
    return (
        <div className="w-screen p-3 border-b border-b-gray-600 flex gap-3 items-center">
            <article className="flex gap-3">
                <div className="bg-[#152A2A]  p-3 rounded-2xl">
                <Monitor size={30} color="#22C38E"/>
            </div>

            <div className="flex flex-col">
                <h1 className="text-2xl font-bold">Painel IHM</h1>
                <p className="font-mono text-sm text-[#6F7D85]">Sistema de Monitoramento Industrial</p>
            </div>
            </article>
            
            <article className="flex gap-3">
                <Button
                icon={<Plus size={20}/>}
                name="Novo Dispositivo"/>
            </article>
        </div>
    )
}