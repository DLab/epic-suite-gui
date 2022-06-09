import {
    Switch,
    Flex,
    Text,
    Button,
    Tooltip,
    IconButton,
    FormControl,
    FormLabel,
    Select,
    Radio,
    RadioGroup,
    Stack,
    DrawerFooter,
    Grid,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";

import { GraphicsData } from "context/GraphicsContext";
import { ModelsSaved } from "context/ModelsContext";
import { NewModelSetted } from "context/NewModelsContext";
import { SelectFeature } from "context/SelectFeaturesContext";
import { SimulationSetted } from "context/SimulationContext";
import { DataParameters } from "types/ModelsTypes";
import { NewModelsAllParams, SimulatorParams } from "types/SimulationTypes";

interface Props {
    onClose: (val: boolean) => void;
}

const ResultsMapsSelection = ({ onClose }: Props) => {
    const [isMap1Checked, setIsMap1Checked] = useState([false, false]);
    const [initialConditionsCheckBox, setinitialConditionsCheckBox] = useState([
        [],
        [],
    ]);
    const [value, setValue] = React.useState(["", ""]);
    const [simIdToShowInMap, setSimIdToShowInMap] = useState(["", ""]);
    const [placeholderText, setPlaceholderText] = useState([
        "Select option",
        "Select option",
    ]);

    const {
        dataToShowInMap,
        setDataToShowInMap,
        allGraphicData,
        setAllResults,
    } = useContext(GraphicsData);
    // const { parameters: parametersSaved } = useContext(ModelsSaved);
    // const { simulation } = useContext(SimulationSetted);
    const { geoSelections } = useContext(SelectFeature);
    const mapArray = ["Map 1", "Map 2"];
    const { completeModel, selectedModelsToSimulate } =
        useContext(NewModelSetted);

    const getInitialConditionsCheck = (simId) => {
        const initialConditionsSim = selectedModelsToSimulate.filter(
            (sim: NewModelsAllParams) => {
                return sim.idNewModel.toString() === simId;
            }
        );
        return Object.keys(
            initialConditionsSim[0].initialConditions[0].conditionsValues
        );
    };

    useEffect(() => {
        const placeholderTextAux = placeholderText;
        if (dataToShowInMap.length === 1) {
            placeholderTextAux[0] = dataToShowInMap[0].nameSim;
            setPlaceholderText(placeholderTextAux);
        }
        if (dataToShowInMap.length === 2) {
            placeholderTextAux[0] = dataToShowInMap[0].nameSim;
            placeholderTextAux[1] = dataToShowInMap[1].nameSim;
            setPlaceholderText(placeholderTextAux);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const simIdToShowInMapAux = simIdToShowInMap;
        const valueAux = value;
        const initialConditionsCheckBoxAux = initialConditionsCheckBox;
        if (dataToShowInMap.length === 1) {
            setIsMap1Checked([true, false]);
            simIdToShowInMapAux[0] = dataToShowInMap[0].idSim;
            setSimIdToShowInMap(simIdToShowInMapAux);
            valueAux[0] = dataToShowInMap[0].parameter;
            setValue(valueAux);
            initialConditionsCheckBoxAux[0] = getInitialConditionsCheck(
                dataToShowInMap[0].idSim
            );
            setinitialConditionsCheckBox(initialConditionsCheckBoxAux);
        }
        if (dataToShowInMap.length === 2) {
            setIsMap1Checked([true, true]);
            simIdToShowInMapAux[0] = dataToShowInMap[0].idSim;
            simIdToShowInMapAux[1] = dataToShowInMap[1].idSim;
            setSimIdToShowInMap(simIdToShowInMapAux);
            valueAux[0] = dataToShowInMap[0].parameter;
            valueAux[1] = dataToShowInMap[1].parameter;
            setValue(valueAux);
            initialConditionsCheckBoxAux[0] = getInitialConditionsCheck(
                dataToShowInMap[0].idSim
            );
            initialConditionsCheckBoxAux[1] = getInitialConditionsCheck(
                dataToShowInMap[1].idSim
            );
            setinitialConditionsCheckBox(initialConditionsCheckBoxAux);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getDataToSave = (index: number) => {
        const {
            name,
            parameters,
            idGeo,
            t_init: tInit,
        } = selectedModelsToSimulate.filter((sim: NewModelsAllParams) => {
            return sim.idNewModel.toString() === simIdToShowInMap[index];
        })[0];

        const { scale } = geoSelections.filter((geoSelection) => {
            return geoSelection.id === idGeo;
        })[0];

        return {
            scale,
            nameSim: name,
            idSim: simIdToShowInMap[index],
            parameter: value[index],
            idGeo,
            duration: parameters.t_end,
            date: tInit,
            idMap: index,
        };
    };

    const saveDataToShowInMap = () => {
        const dataToShowInMapAux = dataToShowInMap;
        if (value[0] !== "") {
            const map1 = getDataToSave(0);
            dataToShowInMapAux[0] = map1;
        }
        if (value[1] !== "") {
            const map2 = getDataToSave(1);
            dataToShowInMapAux[1] = map2;
        }
        setDataToShowInMap(dataToShowInMapAux);
        setAllResults([].concat(dataToShowInMapAux, allGraphicData));
    };

    return (
        <>
            {mapArray.map((map, index) => {
                const placeholderAux = placeholderText[index];
                return (
                    <FormControl
                        display="flex"
                        alignItems="center"
                        flexDirection="column"
                        m="5% 0"
                        key={map}
                    >
                        <Flex w="100%" m="2% 0">
                            <FormLabel mb="0">{map}</FormLabel>
                            <Switch
                                isChecked={isMap1Checked[index]}
                                onChange={(e) => {
                                    if (e.target.checked === false) {
                                        setinitialConditionsCheckBox([
                                            ...initialConditionsCheckBox.slice(
                                                0,
                                                index
                                            ),
                                            [],
                                            ...initialConditionsCheckBox.slice(
                                                index + 1
                                            ),
                                        ]);
                                        setValue([
                                            ...value.slice(0, index),
                                            "",
                                            ...value.slice(index + 1),
                                        ]);
                                        setSimIdToShowInMap([
                                            ...simIdToShowInMap.slice(0, index),
                                            "",
                                            ...simIdToShowInMap.slice(
                                                index + 1
                                            ),
                                        ]);
                                    }

                                    setIsMap1Checked([
                                        ...isMap1Checked.slice(0, index),
                                        e.target.checked,
                                        ...isMap1Checked.slice(index + 1),
                                    ]);
                                }}
                            />
                        </Flex>
                        {isMap1Checked[index] ? (
                            <>
                                <Select
                                    placeholder={placeholderAux}
                                    w="95%"
                                    m="0 2% 3% 2%"
                                    onChange={(e) => {
                                        const simId = e.target.value;
                                        const initialConditionsSim =
                                            selectedModelsToSimulate.filter(
                                                (sim: NewModelsAllParams) => {
                                                    return (
                                                        sim.idNewModel.toString() ===
                                                        simId
                                                    );
                                                }
                                            );

                                        const initialConditionsStrg =
                                            Object.keys(
                                                initialConditionsSim[0]
                                                    .initialConditions[0]
                                                    .conditionsValues
                                            );

                                        setinitialConditionsCheckBox([
                                            ...initialConditionsCheckBox.slice(
                                                0,
                                                index
                                            ),
                                            initialConditionsStrg,
                                            ...initialConditionsCheckBox.slice(
                                                index + 1
                                            ),
                                        ]);
                                        setSimIdToShowInMap([
                                            ...simIdToShowInMap.slice(0, index),
                                            simId,
                                            ...simIdToShowInMap.slice(
                                                index + 1
                                            ),
                                        ]);
                                    }}
                                >
                                    {selectedModelsToSimulate.map(
                                        (sim: NewModelsAllParams) => {
                                            return (
                                                sim.typeSelection ===
                                                    "geographic" &&
                                                sim.populationType ===
                                                    "monopopulation" && (
                                                    <option
                                                        key={sim.idNewModel}
                                                        value={sim.idNewModel}
                                                    >
                                                        {sim.name}
                                                    </option>
                                                )
                                            );
                                        }
                                    )}
                                </Select>
                                {initialConditionsCheckBox[index].length >
                                    0 && (
                                    <RadioGroup
                                        onChange={(e) => {
                                            setValue([
                                                ...value.slice(0, index),
                                                e,
                                                ...value.slice(index + 1),
                                            ]);
                                        }}
                                        value={value[index]}
                                    >
                                        <Text mx="7%">Results</Text>
                                        <Grid
                                            mx="7%"
                                            templateColumns="repeat(3, 1fr)"
                                            gap={3}
                                        >
                                            {initialConditionsCheckBox[
                                                index
                                            ]?.map((paramKey) => {
                                                return (
                                                    <Radio
                                                        bg="white"
                                                        value={`${paramKey}`}
                                                        key={paramKey}
                                                    >
                                                        {paramKey}
                                                    </Radio>
                                                );
                                            })}
                                        </Grid>
                                        <Text mx="7%">Data</Text>
                                        <Grid
                                            mx="7%"
                                            templateColumns="repeat(3, 1fr)"
                                            gap={3}
                                        >
                                            {initialConditionsCheckBox[
                                                index
                                            ]?.map((paramKeyData) => {
                                                return (
                                                    <Radio
                                                        bg="white"
                                                        value={`${paramKeyData} Real`}
                                                        key={`${paramKeyData} Real`}
                                                    >
                                                        {paramKeyData}
                                                    </Radio>
                                                );
                                            })}
                                        </Grid>
                                    </RadioGroup>
                                )}
                            </>
                        ) : (
                            <Select
                                placeholder="Select option"
                                w="95%"
                                m="0 2%"
                                isDisabled
                            />
                        )}
                    </FormControl>
                );
            })}
            <DrawerFooter justifyContent="space-around">
                <Button
                    colorScheme="teal"
                    onClick={() => {
                        saveDataToShowInMap();
                        onClose(true);
                    }}
                >
                    Ok
                </Button>
                <Button
                    variant="outline"
                    onClick={() => {
                        onClose(true);
                    }}
                >
                    Cancel
                </Button>
            </DrawerFooter>
        </>
    );
};

export default ResultsMapsSelection;
