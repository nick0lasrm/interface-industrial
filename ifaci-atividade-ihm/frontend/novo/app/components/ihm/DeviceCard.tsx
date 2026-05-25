"use client";

import { Device } from "@/app/types/device";
import {
    AlertTriangle, Droplets, Gauge, Lock, Radio,
    Thermometer, Unlock, Wifi, WifiOff
} from "lucide-react";

interface DeviceCardProps {
    device: Device;
}

const statusConfig = {
    online: { label: "Online", dotClass: "status-dot status-online" },
    offline: { label: "Offline", dotClass: "status-dot status-offline" },
    warning: { label: "Alerta", dotClass: "status-dot status-warning" }
};


export default function DeviceCard({
    device
}: DeviceCardProps) {

    const statusInfo = statusConfig[device.status];


    return (
        <div className="min-w-max rounded-lg p-5 border border-[#303541] bg-[#171A21] group hover:border-[#22c38d4b]">

            {/* Header */}
            <div className="flex justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className={statusInfo.dotClass} />
                    <div>
                        <span className="text-xs font-mono text-[#819094]">{device.deviceName}-{String(device.id).padStart(2, "0")}</span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 bg-[#272C35] text-[#819094] rounded">
                        {statusInfo.label}
                    </span>
                </div>
            </div>

            {/* Sensors */}
            <div className="grid grid-cols-2 gap-2 mb-4">
                <SensorBadge
                    icon={<Thermometer className="h-3.5 w-3.5" />}
                    label="Temp"
                    value={`${device.sensors.temperature.toFixed(1)}°C`}
                    alert={device.sensors.temperature > 80}
                />

                <SensorBadge
                    icon={<Gauge className="h-3.5 w-3.5" />}
                    label="Pressão"
                    value={`${device.sensors.pressure.toFixed(2)} atm`}
                    alert={device.sensors.pressure > 2}
                />

                <SensorBadge
                    icon={<Droplets className="h-3.5 w-3.5" />}
                    label="Umidade"
                    value={`${device.sensors.humidity.toFixed(0)}%`}
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
                />

                <ControlRow
                    icon={device.connectionEnabled ? <Wifi className="h-4 w-4 text-green-500" /> : <WifiOff className="h-4 w-4 text-red-500" />}
                    label="Conexão"
                    status={device.connectionEnabled ? "Conectado" : "Desconectado"}
                    statusColor={device.connectionEnabled ? "text-green-500" : "text-red-500"}
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
    statusColor
}: {
    icon: React.ReactNode;
    label: string;
    status: string;
    statusColor: string;
}) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                {icon}
                <span className="text-sm text-foreground">{label}</span>
                <span className={`text-xs font-mono ${statusColor}`}>{status}</span>
            </div>
        </div>
    );
}