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
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";

import { GraphicsData } from "context/GraphicsContext";
import { ModelsSaved } from "context/ModelsContext";
import { SelectFeature } from "context/SelectFeaturesContext";
import { SimulationSetted } from "context/SimulationContext";
import { DataParameters } from "types/ModelsTypes";
import { SimulatorParams } from "types/SimulationTypes";

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
    const { dataToShowInMap, setDataToShowInMap } = useContext(GraphicsData);
    const { parameters: parametersSaved } = useContext(ModelsSaved);
    const { simulation } = useContext(SimulationSetted);
    const { geoSelections } = useContext(SelectFeature);
    const mapArray = ["Map 1", "Map 2"];
    // const isMap1CheckedAux = isMap1Checked;

    const getDataToSave = (index) => {
        const { name, idModel, idGeo } = simulation.filter(
            (sim: SimulatorParams) => {
                return sim.idSim.toString() === simIdToShowInMap[index];
            }
        )[0];

        const { featureSelected, scale } = geoSelections.filter(
            (geoSelection) => {
                return geoSelection.id === idGeo;
            }
        )[0];

        const { parameters } = parametersSaved.filter(
            (model: DataParameters) => {
                return model.id === idModel;
            }
        )[0];

        return {
            scale,
            nameSim: name,
            geoSelect: featureSelected,
            idSim: simIdToShowInMap[index],
            parameter: value[index],
            idGeo,
            duration: parameters.t_end,
        };
    };

    const saveDataToShowInMap = () => {
        let map1 = dataToShowInMap[0];
        if (value[0] !== "") {
            map1 = getDataToSave(0);
        }
        let map2 = dataToShowInMap[1];
        if (value[1] !== "") {
            map2 = getDataToSave(1);
        }
        setDataToShowInMap([map1, map2]);
    };

    return (
        <>
            {mapArray.map((map, index) => {
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
                                        // setinitialConditionsCheckBox([]);
                                    }

                                    // isMap1CheckedAux[index] = e.target.checked;

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
                                    placeholder="Select option"
                                    w="95%"
                                    m="0 2% 3% 2%"
                                    onChange={(e) => {
                                        const simId = e.target.value;
                                        const initialConditionsSim =
                                            simulation.filter(
                                                (sim: SimulatorParams) => {
                                                    return (
                                                        sim.idSim.toString() ===
                                                        simId
                                                    );
                                                }
                                            );
                                        const initialConditionsStrg =
                                            Object.keys(
                                                initialConditionsSim[0]
                                                    .initialConditions
                                            );

                                        setinitialConditionsCheckBox(
                                            [
                                                ...initialConditionsCheckBox.slice(
                                                    0,
                                                    index
                                                ),
                                                initialConditionsStrg,
                                                ...initialConditionsCheckBox.slice(
                                                    index + 1
                                                ),
                                            ]
                                            // initialConditionsStrg.split(",")
                                        );
                                        setSimIdToShowInMap([
                                            ...simIdToShowInMap.slice(0, index),
                                            simId,
                                            ...simIdToShowInMap.slice(
                                                index + 1
                                            ),
                                        ]);
                                    }}
                                >
                                    {simulation.map((sim) => {
                                        return (
                                            sim.typeSelection ===
                                                "Geographic" && (
                                                <option
                                                    key={sim.idSim}
                                                    value={sim.idSim}
                                                >
                                                    {sim.name}
                                                </option>
                                            )
                                        );
                                    })}
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
                                        <Text>Results</Text>
                                        <Stack direction="row" m="4% 0">
                                            {initialConditionsCheckBox[
                                                index
                                            ]?.map((paramKey) => {
                                                return (
                                                    <Radio
                                                        value={`${paramKey}`}
                                                        key={paramKey}
                                                    >
                                                        {paramKey}
                                                    </Radio>
                                                );
                                            })}
                                        </Stack>
                                        <Text>Data</Text>
                                        <Stack direction="row" m="4% 0">
                                            {initialConditionsCheckBox[
                                                index
                                            ]?.map((paramKeyData) => {
                                                return (
                                                    <Radio
                                                        value={`${paramKeyData} Real`}
                                                        key={`${paramKeyData} Real`}
                                                    >
                                                        {paramKeyData}
                                                    </Radio>
                                                );
                                            })}
                                        </Stack>
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
