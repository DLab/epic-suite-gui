import { useContext } from "react";

import NumberInputEpi from "../../NumberInputEpi";
import { ControlPanel } from "context/ControlPanelContext";

const InterventionsParameters = () => {
  const { parameters, setParameters } = useContext(ControlPanel);
  return (
    <NumberInputEpi
      value={parameters.alpha}
      setValue={setParameters}
      nameParams="alpha"
      name="Alpha (α)"
      description="Mobility"
      step={0.01}
      min={0.01}
      max={1}
      type="slider"
    />
  );
};

export default InterventionsParameters;
