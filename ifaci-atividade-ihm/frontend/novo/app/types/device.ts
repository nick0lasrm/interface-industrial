export interface DeviceSensors {
  temperature: number;
  pressure: number;
  humidity: number;
  presenceDetected: boolean;
}

export interface Device { 
  id: number;
  deviceName: string;
  location: string;
  status: "online" | "offline" | "warning";
  connectionEnabled: boolean;
  relayLocked: boolean;
  sensors: DeviceSensors;
}