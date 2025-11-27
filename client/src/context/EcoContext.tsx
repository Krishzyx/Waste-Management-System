import React, { createContext, useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export type WasteType = 'Plastic' | 'Metal' | 'Organic' | 'Paper' | 'E-Waste' | 'Glass';

export interface WasteData {
  type: WasteType;
  amount: number; // in kg
  recyclable: boolean;
}

export interface Drumyard {
  id: string;
  name: string;
  owner: string;
  location: string;
  wasteStock: WasteData[];
}

export interface NGO {
  id: string;
  name: string;
  type: 'Private' | 'Government';
  location: string;
  specialization: WasteType[];
}

export interface Connection {
  id: string;
  drumyardId: string;
  ngoId: string;
  wasteType: WasteType;
  amount: number;
  status: 'Pending' | 'Collected' | 'Processed';
  date: string;
}

interface EcoContextType {
  drumyards: Drumyard[];
  ngos: NGO[];
  connections: Connection[];
  addDrumyard: (data: Omit<Drumyard, "id">) => void;
  addNGO: (data: Omit<NGO, "id">) => void;
  createConnection: (data: Omit<Connection, "id" | "date" | "status">) => void;
  updateConnectionStatus: (id: string, status: Connection['status']) => void;
  getStats: () => { totalWaste: number; totalRecycled: number; activeConnections: number };
}

const EcoContext = createContext<EcoContextType | undefined>(undefined);

export const EcoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Mock Data
  const [drumyards, setDrumyards] = useState<Drumyard[]>([
    {
      id: "d1",
      name: "GreenCycle Central",
      owner: "John Doe",
      location: "North District",
      wasteStock: [
        { type: "Plastic", amount: 1200, recyclable: true },
        { type: "Metal", amount: 450, recyclable: true },
      ],
    },
    {
      id: "d2",
      name: "Urban Waste Hub",
      owner: "Jane Smith",
      location: "Industrial Zone",
      wasteStock: [
        { type: "E-Waste", amount: 300, recyclable: true },
        { type: "Organic", amount: 2000, recyclable: false },
      ],
    },
  ]);

  const [ngos, setNgos] = useState<NGO[]>([
    {
      id: "n1",
      name: "SaveTheEarth Foundation",
      type: "Private",
      location: "City Center",
      specialization: ["Plastic", "Paper"],
    },
    {
      id: "n2",
      name: "GovGreen Initiative",
      type: "Government",
      location: "Statewide",
      specialization: ["Metal", "E-Waste", "Glass"],
    },
  ]);

  const [connections, setConnections] = useState<Connection[]>([
    {
      id: "c1",
      drumyardId: "d1",
      ngoId: "n1",
      wasteType: "Plastic",
      amount: 500,
      status: "Processed",
      date: "2023-10-15",
    },
    {
      id: "c2",
      drumyardId: "d2",
      ngoId: "n2",
      wasteType: "E-Waste",
      amount: 150,
      status: "Collected",
      date: "2023-10-20",
    },
  ]);

  const addDrumyard = (data: Omit<Drumyard, "id">) => {
    const newDrumyard = { ...data, id: uuidv4() };
    setDrumyards((prev) => [...prev, newDrumyard]);
  };

  const addNGO = (data: Omit<NGO, "id">) => {
    const newNGO = { ...data, id: uuidv4() };
    setNgos((prev) => [...prev, newNGO]);
  };

  const createConnection = (data: Omit<Connection, "id" | "date" | "status">) => {
    const newConnection: Connection = {
      ...data,
      id: uuidv4(),
      status: "Pending",
      date: new Date().toISOString().split('T')[0],
    };
    setConnections((prev) => [...prev, newConnection]);
  };

  const updateConnectionStatus = (id: string, status: Connection['status']) => {
    setConnections(prev => prev.map(c => c.id === id ? { ...c, status } : c));
  }

  const getStats = () => {
    const totalWaste = drumyards.reduce((acc, d) => acc + d.wasteStock.reduce((sum, w) => sum + w.amount, 0), 0);
    const totalRecycled = connections.filter(c => c.status === 'Processed').reduce((acc, c) => acc + c.amount, 0);
    const activeConnections = connections.filter(c => c.status !== 'Processed').length;
    return { totalWaste, totalRecycled, activeConnections };
  };

  return (
    <EcoContext.Provider value={{ drumyards, ngos, connections, addDrumyard, addNGO, createConnection, updateConnectionStatus, getStats }}>
      {children}
    </EcoContext.Provider>
  );
};

export const useEco = () => {
  const context = useContext(EcoContext);
  if (!context) {
    throw new Error("useEco must be used within an EcoProvider");
  }
  return context;
};
