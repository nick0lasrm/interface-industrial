"use client"

import { Device } from "@/app/types/device"
import { useEffect, useRef, useState } from "react"
import Input from "../ui/Input"
import Button from "../ui/Button"
import { Plus, X } from "lucide-react";

interface IAddDeviceModalProps {
    onAdd?: (device: Device) => boolean | void
    device?: Device[]
}

export function AddDeviceModal({ onAdd, device }: IAddDeviceModalProps) {
    const [modalAberto, setModalAberto] = useState(false)
    const modalRef = useRef<HTMLDivElement | null>(null)
    const [deviceName, setDeviceName] = useState("");
    const [location, setLocation] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!location || !deviceName) {
            setError("Por favor, preencha todos os campos.");
            return;
        }

        const deviceNameExists = device?.some(
            d => d.deviceName.toLowerCase() === deviceName.toLowerCase()
        );

        if (deviceNameExists) {
            setError("Nome do dispositivo já existe. Por favor, escolha um nome único.");
            return;
        }

        const generatedId =
    device && device.length > 0
        ? Math.max(...device.map(d => d.id)) + 1
        : 1;

        onAdd?.({
            id: generatedId,
            deviceName,
            location,
            status: "online",
            connectionEnabled: true,
            relayLocked: false,
            sensors: {
                temperature: +(Math.random() * 50 + 15).toFixed(1),
                pressure: +(Math.random() * 1.5 + 0.5).toFixed(2),
                humidity: +(Math.random() * 60 + 20).toFixed(0),
                presenceDetected: Math.random() > 0.5
            }
        })
        setError("")
        setLocation("")
        setDeviceName("")
        setModalAberto(false)
    }


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setModalAberto(false)
            }
        }
        if (modalAberto) {
            document.addEventListener("mousedown", handleClickOutside)
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [modalAberto])


    return (
        <div>
            <Button
                style="addDevice"
                icon={<Plus size={20} />}
                name="Novo Dispositivo"
                onClick={() => { setModalAberto(true) }} />
            {modalAberto &&
                <div className="w-screen h-screen inset-0 absolute bg-black/70 flex justify-center items-center z-50">
                    <div
                        ref={modalRef}
                        className="w-140 min-h-80 bg-[#1B1F27] rounded-md p-6">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-bold">Adicionar Dispositivo</h2>
                                <Button style="close" icon={<X size={15} />} onClick={() => setModalAberto(false)} />
                            </div>
                            <div className="flex flex-col gap-4">
                                <div>
                                    <Input
                                        label="Nome do Dispositivo"
                                        placeholder={"IHM"}
                                        value={deviceName}
                                        onChange={(e) => setDeviceName(e.target.value)} />
                                    {error && (
                                        <span className="text-red-500 text-xs">{error}</span>
                                    )}
                                </div>
                                <Input
                                    label="Localização"
                                    placeholder="Controlador Sala F"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)} />
                            </div>
                            <Button type="submit" style="submit" name="Adicionar" />
                        </form>
                    </div>
                </div>

            }

        </div>

    )
}
