"use client"

import { Monitor } from "lucide-react"
import Header from "./components/Header"
import DeviceCard from "./components/ihm/DeviceCard"
import { useState } from "react"
import { Device } from "./types/device"

const index = () => {
  const [devices, setDevices] = useState<Device[]>([])

  const toggleConnection = (id: number) => {
    setDevices((prev) =>
      prev.map((d) => {
        if (d.id !== id) return d;

        const updated = {
          ...d,
          connectionEnabled: !d.connectionEnabled
        };

        return {
          ...updated,
          status: getDeviceStatus(updated)
        };
      })
    );
  };

  const toggleRelay = (id: number) => {
    setDevices(prev => prev.map(d => d.id === id ? { ...d, relayLocked: !d.relayLocked } : d))
  }

  const addDevice = (device: Device) => {
    const status = getDeviceStatus(device);
    setDevices(prev => [...prev, { ...device, status }])
  }

  const deleteDevice = (id: number) => {
    setDevices(prev => prev.filter(d => d.id !== id))
  }

  const updateDevice = (updated: Device) => {
    setDevices(prev => prev.map(d => {
      if (d.id !== updated.id) return d;

      const newStatus = getDeviceStatus(updated);
      return { ...updated, status: newStatus };
    }
    ))
  }

  function getDeviceStatus(device: Device): Device["status"] {
    const { temperature, pressure} = device.sensors;

    const isAlert =
      temperature > 80 ||
      pressure > 2

    if (!device.connectionEnabled) return "offline";
    if (isAlert) return "warning";

    return "online";
  }

  const onlineCount = devices.filter(d => d.status === "online").length
  const warningCount = devices.filter(d => d.status === "warning").length

  return (
    <div>
      <Header
        onlineCount={onlineCount}
        warningCount={warningCount}
        deviceCount={devices.length}
        onAddDevice={addDevice}
        devices={devices}
      />
      <main className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {devices.map((device) => (
            <DeviceCard
              key={device.id}
              device={device}
              onToggleConnection={toggleConnection}
              onToggleRelay={toggleRelay}
              onDelete={deleteDevice}
              onUpdate={updateDevice}
            />
          ))}
        </div>

        {devices.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <Monitor className="h-12 w-12 mb-4 opacity-30" />
            <p className="text-sm text-[#6F7D85]">Nenhum dispositivo cadastrado</p>
          </div>
        )}
      </main>
    </div>
  )

}

export default index