"use client";

import { Device, DeviceSensors } from "@/app/types/device";
import {
    AlertTriangle, Check, Droplets, Gauge, Lock,
    Pencil, Radio, Thermometer, Trash2,
    Unlock, Wifi, WifiOff, X
} from "lucide-react";
import Switch from "../ui/Switch";
import Button from "../ui/Button";
import { useState } from "react";
import Input from "../ui/Input";

interface DeviceCardProps {
    device: Device;
    status: Device["status"];
    onToggleConnection: (id: string) => void;
    onToggleRelay: (id: string) => void;
    onDelete: (id: string) => void;
    onUpdate: (device: Device) => void;
}

const statusConfig = {
    online: { label: "Online", dotClass: "status-dot status-online" },
    offline: { label: "Offline", dotClass: "status-dot status-offline" },
    warning: { label: "Alerta", dotClass: "status-dot status-warning" }
};

export default function DeviceCard({
    device,
    onToggleConnection,
    onToggleRelay,
    onDelete,
    onUpdate
}: DeviceCardProps) {

    const statusInfo = statusConfig[device.status];
    const [editing, setEditing] = useState(false);
    const [draft, setDraft] = useState(device);

    const startEdit = () => {
        setDraft(device);
        setEditing(true);
    };

    const cancelEdit = () => setEditing(false);

    const saveEdit = () => {
        onUpdate(draft);
        setEditing(false);
    };

    const updateSensor = (key: keyof DeviceSensors, value: string | boolean) => {
        setDraft(d => ({
            ...d,
            sensors: {
                ...d.sensors,
                [key]: typeof value === "string" ? parseFloat(value) || 0 : value
            }
        }));
    };

    if (editing) {
           return (
            <div className="rounded-lg p-5 border border-[#22c38d56]  ">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-[#22C38E] uppercase tracking-wider">Editando dispositivo</span>
                    <div className="flex gap-1">
                        <Button style="ghost" className="h-7 w-7" onClick={saveEdit}
                            icon={<Check className="h-4 w-4" color="#22C38E" />} />
                        <Button style="ghost" className="h-7 w-7" onClick={cancelEdit}
                            icon={<X className="h-4 w-4" color="red" />} />
                    </div>
                </div>

                <div className="space-y-3">
                    <div>
                        <label className="text-[10px] uppercase text-[#819094] tracking-wider font-mono block">Nome</label>
                        <Input
                            value={draft.name}
                            onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
                            className="h-8 text-xs font-extralight font-mono text-white"
                        />
                    </div>
                    <div>
                        <label className="text-[10px] uppercase text-[#819094] tracking-wider font-mono block">ID</label>
                        <Input
                            value={draft.id}
                            onChange={(e) => setDraft((d) => ({ ...d, id: e.target.value }))}
                            className="h-8 text-xs font-extralight font-mono text-white"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-[10px] uppercase text-[#819094] tracking-wider font-mono block">
                                <Thermometer className="h-3 w-3 inline mr-1" />Temp (°C)
                            </label>
                            <Input
                                type="number"
                                value={draft.sensors.temperature}
                                onChange={(e) => updateSensor("temperature", e.target.value)}
                                className="h-8 text-xs font-extralight font-mono text-white"
                            />
                        </div>
                        <div>
                            <label className="text-[10px] uppercase text-[#819094] tracking-wider font-mono block">
                                <Gauge className="h-3 w-3 inline mr-1" />Pressão (atm)
                            </label>
                            <Input
                                type="number"
                                step="0.1"
                                value={draft.sensors.pressure}
                                onChange={(e) => updateSensor("pressure", e.target.value)}
                                className="h-8 text-xs font-extralight font-mono text-white"
                            />
                        </div>
                        <div>
                            <label className="text-[10px] uppercase text-[#819094] tracking-wider font-mono block">
                                <Droplets className="h-3 w-3 inline mr-1" />Umidade (%)
                            </label>
                            <Input
                                type="number"
                                value={draft.sensors.humidity}
                                onChange={(e) => updateSensor("humidity", e.target.value)}
                                className="h-8 text-xs font-extralight font-mono text-white"
                            />
                        </div>
                        <div className="flex items-end pb-1">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <Switch
                                    enabled={draft.sensors.presenceDetected}
                                    onToggle={() => updateSensor("presenceDetected", !draft.sensors.presenceDetected)}
                                />
                                <span className="text-xs font-mono">
                                    <Radio className="h-3 w-3 inline mr-1" />Presença
                                </span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-w-max rounded-lg p-5 border border-[#303541] bg-[#171A21] group hover:border-[#22c38d4b]">

            {/* Header */}
            <div className="flex justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className={statusInfo.dotClass} />
                    <div>
                        <h3 className="text-sm font-semibold">{device.name}</h3>
                        <span className="text-xs font-mono text-[#819094]">{device.id}</span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 bg-[#272C35] text-[#819094] rounded">
                        {statusInfo.label}
                    </span>

                    <Button
                        style="ghost"
                        className="h-7 w-7 opacity-0 group-hover:opacity-100 hover:text-green-500"
                        onClick={startEdit}
                        icon={<Pencil className="h-3.5 w-3.5" />}
                    />

                    <Button
                        style="ghost"
                        className="h-7 w-7 opacity-0 group-hover:opacity-100 hover:text-red-500"
                        onClick={() => onDelete(device.id)}
                        icon={<Trash2 className="h-3.5 w-3.5" />}
                    />
                </div>
            </div>

            {/* Sensors */}
            <div className="grid grid-cols-2 gap-2 mb-4">
                <SensorBadge
                    icon={<Thermometer className="h-3.5 w-3.5" />}
                    label="Temp"
                    value={`${device.sensors.temperature}°C`}
                    alert={device.sensors.temperature > 80}
                />
                <SensorBadge
                    icon={<Gauge className="h-3.5 w-3.5" />}
                    label="Pressão"
                    value={`${device.sensors.pressure} atm`}
                    alert={device.sensors.pressure > 2}
                />
                <SensorBadge
                    icon={<Droplets className="h-3.5 w-3.5" />}
                    label="Umidade"
                    value={`${device.sensors.humidity}%`}
                />
                <SensorBadge
                    icon={<Radio className="h-3.5 w-3.5" />}
                    label="Presença"
                    value={device.sensors.presenceDetected ? "Detectado" : "Ausente"}
                    highlight={device.sensors.presenceDetected}
                />
            </div>

            {/* Controls */}
            <div className="space-y-4 pt-3 border-t border-[#303541]">

                <ControlRow
                    icon={device.relayLocked ? <Lock className="h-4 w-4 text-green-500" /> : <Unlock className="h-4 w-4 text-red-500" />}
                    label="Relé"
                    status={device.relayLocked ? "Liberado" : "Travado"}
                    statusColor={device.relayLocked ? "text-green-500" : "text-red-500"}
                    checked={device.relayLocked}
                    onToggle={() => onToggleRelay(device.id)}
                />

                <ControlRow
                    icon={device.connectionEnabled ? <Wifi className="h-4 w-4 text-green-500" /> : <WifiOff className="h-4 w-4 text-red-500" />}
                    label="Conexão"
                    status={device.connectionEnabled ? "Conectado" : "Desconectado"}
                    statusColor={device.connectionEnabled ? "text-green-500" : "text-red-500"}
                    checked={device.connectionEnabled}
                    onToggle={() => onToggleConnection(device.id)}
                />

            </div>
        </div>
    );
}

function SensorBadge({
    icon,
    label,
    value,
    alert = false,
    highlight = false,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
    alert?: boolean;
    highlight?: boolean;
}) {
    return (
        <div
            className={`flex items-center gap-2 rounded-md px-3 py-2 bg-[#1D222A] text-xs font-mono font-light ${alert ? "border border-[#EF4444]/40" : highlight ? "border border-[#22C38E]/30" : "border border-transparent"
                }`}
        >
            <span className={alert ? "text-[#EF4444]" : highlight ? "text-[#22C38E]" : "text-[#819094]"}>{icon}</span>
            <div className="flex flex-col">
                <span className="text-[#819094] text-[10px] uppercase tracking-wider">{label}</span>
                <span className={`font-medium ${alert ? "text-[#EF4444]" : "text-foreground"}`}>{value}</span>
            </div>
            {alert && <AlertTriangle className="h-3 w-3 text-orange-400 ml-auto" />}
        </div>
    );
}

function ControlRow({
    icon,
    label,
    status,
    statusColor,
    checked,
    onToggle,
}: {
    icon: React.ReactNode;
    label: string;
    status: string;
    statusColor: string;
    checked: boolean;
    onToggle: () => void;
}) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                {icon}
                <span className="text-sm text-foreground">{label}</span>
                <span className={`text-xs font-mono ${statusColor}`}>{status}</span>
            </div>
            <Switch enabled={checked} onToggle={onToggle} />
        </div>
    );
}