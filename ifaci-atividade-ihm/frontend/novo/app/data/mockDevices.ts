import { Device } from "../types/device";

export const initialDevices: Device[] = [
  {
    id: "IHM-001",
    name: "Controlador Caldeira A",
    status: "online",
    connectionEnabled: true,
    relayLocked: true,
    sensors: { temperature: 72.5, pressure: 1.2, humidity: 45, presenceDetected: true },
  },
  {
    id: "IHM-002",
    name: "Sensor Linha B",
    status: "online",
    connectionEnabled: true,
    relayLocked: false,
    sensors: { temperature: 23.1, pressure: 0.98, humidity: 62, presenceDetected: false },
  },
  {
    id: "IHM-003",
    name: "Monitor Esteira C",
    status: "offline",
    connectionEnabled: false,
    relayLocked: true,
    sensors: { temperature: 0, pressure: 0, humidity: 0, presenceDetected: false },
  },
  {
    id: "IHM-004",
    name: "Válvula Pressão D",
    status: "warning",
    connectionEnabled: true,
    relayLocked: false,
    sensors: { temperature: 89.3, pressure: 2.1, humidity: 31, presenceDetected: true },
  },
  {
    id: "IHM-005",
    name: "Compressor Sala E",
    status: "online",
    connectionEnabled: true,
    relayLocked: true,
    sensors: { temperature: 35.7, pressure: 1.5, humidity: 55, presenceDetected: false },
  },
];