import React, { createContext, useState } from "react";

export interface SavedSimulationData {
  name: string;
  keys: string[];
}

interface LooseObject {
  [key: string]: unknown;
}

interface CheckedObject {
  [key: string]: boolean;
}

interface CheckedItems {
  [key: string]: CheckedObject;
}

export interface SimulationKeysData {
  E: LooseObject;
  E_ac: LooseObject;
  E_d: LooseObject;
  Flux: LooseObject;
  I: LooseObject;
  I_ac: LooseObject;
  I_ac_det: LooseObject;
  I_d: LooseObject;
  I_d_det: LooseObject;
  I_det: LooseObject;
  R: LooseObject;
  R_ac: LooseObject;
  R_d: LooseObject;
  S: LooseObject;
  dates: LooseObject;
  name: "";
  prevalence_det: LooseObject;
  prevalence_susc: LooseObject;
  prevalence_total: LooseObject;
  t: LooseObject;
}

interface GraphicsProps {
  simulationKeys: SimulationKeysData[];
  setSimulationKeys: (value: SimulationKeysData[]) => void;
  savedSimulationKeys: string[];
  setSavedSimulationKeys: (value: string[]) => void;
  savedSimulation: SavedSimulationData[];
  setSavedSimulation: (value: SavedSimulationData[]) => void;
  allGraphicData: SavedSimulationData[][];
  setAllGraphicData?: (value: SavedSimulationData[][]) => void;
  checkedItems: CheckedItems;
  setCheckedItems: (value: CheckedItems) => void;
}

export const GraphicsData = createContext<GraphicsProps>({
  simulationKeys: [],
  setSimulationKeys: () => {},
  savedSimulationKeys: [],
  setSavedSimulationKeys: () => {},
  savedSimulation: [],
  setSavedSimulation: () => {},
  allGraphicData: [],
  setAllGraphicData: () => {},
  checkedItems: {},
  setCheckedItems: () => {},
});

const GraphicsContext: React.FC = ({ children }) => {
  // para ver mostar las keys de los parametros en los checkbox
  const [simulationKeys, setSimulationKeys] = useState([]);
  // para ver las keys que se repiten segun key+nombre de la simulación
  const [savedSimulationKeys, setSavedSimulationKeys] = useState<string[]>([]);
  const [savedSimulation, setSavedSimulation] = useState<SavedSimulationData[]>(
    []
  );
  // va juntando todas las simulaciones para poder ver más de un gráfico
  const [allGraphicData, setAllGraphicData] = useState<SavedSimulationData[][]>(
    []
  );
  const [checkedItems, setCheckedItems] = useState({});

  return (
    <GraphicsData.Provider
      value={{
        simulationKeys,
        setSimulationKeys,
        savedSimulationKeys,
        setSavedSimulationKeys,
        savedSimulation,
        setSavedSimulation,
        allGraphicData,
        setAllGraphicData,
        checkedItems,
        setCheckedItems,
      }}
    >
      {children}
    </GraphicsData.Provider>
  );
};

export default GraphicsContext;
