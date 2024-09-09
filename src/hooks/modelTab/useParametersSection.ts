import { useCallback, useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { ControlPanel } from "context/ControlPanelContext";
import { NewModelSetted } from "context/NewModelsContext";
import type { RootState } from "store/store";
import type { EpidemicsData } from "types/ControlPanelTypes";
import type { NewModelsAllParams } from "types/SimulationTypes";

import useUpdateControlPanel from "./useUpdateControlPanel";

function createIsEnabledObject(parameters) {
    const parameterList = [
        "rR_S",
        "tE_I",
        "tI_R",
        "beta",
        "alpha",
        "Beta_v",
        "vac_d",
        "vac_eff",
        "pE_Im",
        "tE_Im",
        "pE_Icr",
        "tE_Icr",
        "tEv_Iv",
        "tIm_R",
        "tIcr_H",
        "pIv_R",
        "tIv_R",
        "pIv_H",
        "tIv_H",
        "pH_R",
        "tH_R",
        "pH_D",
        "tH_D",
        "pR_S",
        "tR_S",
    ];

    return parameterList.reduce((isEnabledObject, key) => {
        // eslint-disable-next-line no-param-reassign
        isEnabledObject[key] = Array.isArray(parameters[key])
            ? parameters[key].map((variable) => variable.isEnabled)
            : [parameters[key].isEnabled];
        return isEnabledObject;
    }, {});
}
function updateIsEnabledObject(parameters, setIsEnableIconButton) {
    setIsEnableIconButton(createIsEnabledObject(parameters));
}
export default function useParametersSection() {
    const { description, setDataViewVariable, idModelUpdate } =
        useContext(ControlPanel);
    const { completeModel, name } = useContext(NewModelSetted);
    const parameters = useSelector(
        (state: RootState) => state.controlPanel
    ) as unknown as EpidemicsData;
    const [isEnableIconButton, setIsEnableIconButton] = useState<
        Record<string, boolean[]>
    >(createIsEnabledObject(parameters));
    const changePermissionsTimeDependentVar = useCallback(
        (newIsEnableIconButton) => {
            setIsEnableIconButton(newIsEnableIconButton);
        },
        []
    );
    const updateControlPanel = useUpdateControlPanel();
    useEffect(() => {
        const paramsModelsToUpdate = completeModel.find(
            (model: NewModelsAllParams) => model.idNewModel === idModelUpdate
        );
        if (paramsModelsToUpdate) {
            updateControlPanel({
                type: "update",
                updateData: paramsModelsToUpdate.parameters,
            });
            // changePermissionsTimeDependentVar(
            //     createIsEnabledObject(paramsModelsToUpdate.parameters)
            // );
            updateIsEnabledObject(
                paramsModelsToUpdate.parameters,
                setIsEnableIconButton
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [completeModel, idModelUpdate]);

    const otherParameters = {
        Beta_v: parameters.Beta_v,
        vac_d: parameters.vac_d,
        vac_eff: parameters.vac_eff,
        pE_Im: parameters.pE_Im,
        tE_Im: parameters.tE_Im,
        pE_Icr: parameters.pE_Icr,
        tE_Icr: parameters.tE_Icr,
        tEv_Iv: parameters.tEv_Iv,
        tIm_R: parameters.tIm_R,
        tIcr_H: parameters.tIcr_H,
        pIv_R: parameters.pIv_R,
        tIv_R: parameters.tIv_R,
        pIv_H: parameters.pIv_H,
        tIv_H: parameters.tIv_H,
        pH_R: parameters.pH_R,
        tH_R: parameters.tH_R,
        pH_D: parameters.pH_D,
        tH_D: parameters.tH_D,
        pR_S: parameters.pR_S,
        tR_S: parameters.tR_S,
    };

    return {
        name,
        description,
        isEnableIconButton,
        parameters,
        changePermissionsTimeDependentVar,
        setDataViewVariable,
        otherParameters,
    };
}
