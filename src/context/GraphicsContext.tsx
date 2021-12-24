import React, { createContext, useState } from "react";

import { SavedSimulationData, GraphicsProps } from "types/GraphicsTypes";

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
