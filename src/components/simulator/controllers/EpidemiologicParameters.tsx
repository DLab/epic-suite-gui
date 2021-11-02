import { useContext } from "react";

import NumberInputEpi from "../../NumberInputEpi";
import { ControlPanel } from "context/ControlPanelContext";

const EpidemiologicParameters = () => {
  const { parameters, setParameters } = useContext(ControlPanel);

  return (
    <>
      <NumberInputEpi
        value={parameters.beta}
        setValue={setParameters}
        nameParams="beta"
        step={0.001}
        min={0.01}
        max={0.5}
        type="slider"
      />
      <NumberInputEpi
        value={parameters.r_R_S}
        setValue={setParameters}
        nameParams="r_R_S"
        type="number"
      />
      <NumberInputEpi
        value={parameters.mu}
        setValue={setParameters}
        nameParams="mu"
        step={0.01}
        min={0.01}
        max={20}
        type="slider"
      />
      <NumberInputEpi
        value={parameters.tI_R}
        setValue={setParameters}
        nameParams="tI_R"
        type="number"
      />
      <NumberInputEpi
        value={parameters.tE_I}
        setValue={setParameters}
        nameParams="tE_I"
        type="number"
      />
      <NumberInputEpi
        value={parameters.pI_det}
        setValue={setParameters}
        nameParams="pI_det"
        step={1}
        min={0.01}
        max={1}
        type="slider"
      />
    </>
  );
};

export default EpidemiologicParameters;
