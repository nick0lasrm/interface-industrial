"use client"

import { Monitor } from "lucide-react"
import Header from "./components/Header"
import DeviceCard from "./components/ihm/DeviceCard"
import { useEffect, useState } from "react"
import { Device } from "./types/device"

const Page = () => {
  const [devices, setDevices] = useState<Device[]>([])

  const loadDevices = async () => {
    const res = await fetch("http://localhost:8080/iot")
    const data = await res.json()

    const mapped: Device[] = data.map((api: any) => ({
      id: api.id,
      deviceName: " Sensor",

      status: "online",

      connectionEnabled: true,
      relayLocked: api.trava_seguranca,

      sensors: {
        temperature: api.temperatura,
        pressure: api.pressao,
        humidity: api.umidade,
        presenceDetected: api.sensor_presenca,
      }
    }))

    setDevices(mapped)
  }

  useEffect(() => {

    loadDevices()

    const interval = setInterval(() => {
      loadDevices()
    }, 1000)

    return () => clearInterval(interval)

  }, [])

  return (
    <div>
      <Header
        onlineCount={devices.filter(d => d.status === "online").length}
        warningCount={devices.filter(d => d.status === "warning").length}
        deviceCount={devices.length}
        devices={devices}
      />

      <main className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {devices.map((device) => (
            <DeviceCard
              key={device.id}
              device={device}
            />
          ))}
        </div>

        {devices.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <Monitor className="h-12 w-12 mb-4 opacity-30" />
            <p className="text-sm text-[#6F7D85]">
              Nenhum dispositivo cadastrado
            </p>
          </div>
        )}
      </main>
    </div>
  )
}

export default Page