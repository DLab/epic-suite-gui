import {
  Text,
  Accordion,
  AccordionPanel,
  AccordionButton,
  AccordionItem,
  Box,
  Flex,
  AccordionIcon,
  Button,
} from "@chakra-ui/react";
import React, { useState, useEffect, useContext } from "react";

import { Model, SelectFeature } from "context/SelectFeaturesContext";
import countiesData from "data/counties.json";
import stateData from "data/states.json";
import createIdComponent from "utils/createIdcomponent";

interface DataGeoSelections {
  id: number;
  name: string;
  scale: string;
  featureSelected: string[];
}
interface Props {
  details: DataGeoSelections[];
  setSeeSelections: (value: boolean) => void;
}

interface DataCountiesObj {
  value: string;
  label: string;
}

interface ObjStatesCounties {
  state: string;
  labelState: string;
  counties: DataCountiesObj[];
}
type Acc = ObjStatesCounties[];

const GeoSelectionsDetails = ({ details, setSeeSelections }: Props) => {
  const {
    setMode,
    setIdGeoSelectionUpdate,
    setStates,
    setCounties,
    setScale,
    setNameGeoSelection,
  } = useContext(SelectFeature);
  const [geoSelectionsDetails, setGeoSelectionsDetails] = useState([]);
  let statesOrdered;
  let countiesOrdered;

  const sortStrings = (property: string) => (a, b) => {
    if (a[property] > b[property]) {
      return 1;
    }
    if (a[property] < b[property]) {
      return -1;
    }
    return 0;
  };

  const order = (detail) => {
    detail.map((det) => {
      if (det.scale === "States") {
        statesOrdered = det
          ? det.featureSelected
              .map((e) => ({
                value: e,
                label: stateData.data.find((s) => s[0] === e)[2],
              }))
              .sort(sortStrings("value"))
          : [];
        return statesOrdered;
      }
      countiesOrdered = det
        ? countiesData.data
            .filter(
              (c) => det.featureSelected.includes(`${c[5]}`)
              // filter all counties includes in selection
            )
            .reduce((acc: Acc, item) => {
              // reduce all data in a object
              const obj: ObjStatesCounties = {
                state: item[0] as string,
                labelState: item[2] as string,
                counties: [
                  { value: item[5], label: item[4] },
                ] as DataCountiesObj[],
              };
              const indexState = acc.findIndex((c) => c.state === item[0]);
              // isExist in object ? push : return actual value
              if (indexState >= 0) {
                acc[indexState].counties.push({
                  value: item[5] as string,
                  label: item[4] as string,
                });
                acc[indexState].counties.sort(sortStrings("value"));
                return acc;
              }
              return [...acc, obj];
            }, [])
        : [];
      return countiesOrdered;
    });
  };

  useEffect(() => {
    setGeoSelectionsDetails(details);
  }, [details]);

  order(details);

  const updateGeoSelection = (id, dataForUpdate, name, scale) => {
    setMode(Model.Update);
    setIdGeoSelectionUpdate(id);
    setScale(scale);
    setNameGeoSelection(name);
    if (scale === "Counties") {
      setCounties({ type: "update", updateData: dataForUpdate });
    } else {
      setStates({ type: "update", updateData: dataForUpdate });
    }
  };

  return (
    <>
      {geoSelectionsDetails.map((geoSelection) => {
        return (
          <Flex id={createIdComponent()} direction="column">
            <Text id={createIdComponent()} textAlign="center" fontWeight="400">
              {geoSelection.name}
            </Text>
            <Text id={createIdComponent()} textAlign="center" fontWeight="400">
              {geoSelection.scale}
            </Text>
            <Box id={createIdComponent()} overflowY="auto">
              {geoSelection.scale === "States" &&
                statesOrdered?.map((s) => {
                  return (
                    <Flex
                      key={s.value}
                      justifyContent="space-between"
                      px="1.5rem"
                      fontSize="14px"
                    >
                      {s.label}
                    </Flex>
                  );
                })}

              {geoSelection.scale === "Counties" && (
                <Accordion id={createIdComponent()} allowMultiple>
                  {countiesOrdered?.map((c: ObjStatesCounties) => {
                    const checkbox = c.counties.map((cc) => {
                      return (
                        <Flex
                          id={createIdComponent()}
                          justifyContent="space-between"
                          px="1.5rem"
                        >
                          <Text
                            id={createIdComponent()}
                            fontSize="14px"
                            color="gray.600"
                          >
                            {cc.label}
                          </Text>
                        </Flex>
                      );
                    });
                    return (
                      <AccordionItem id={createIdComponent()}>
                        <h2 id={createIdComponent()}>
                          <AccordionButton id={createIdComponent()}>
                            <Box
                              id={createIdComponent()}
                              flex="1"
                              textAlign="left"
                              fontSize="14px"
                            >
                              {c.labelState}
                            </Box>
                            <AccordionIcon id={createIdComponent()} />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel id={createIdComponent()}>
                          {checkbox}
                        </AccordionPanel>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              )}
            </Box>
            <Flex id={createIdComponent()} justify="space-around">
              <Button
                id={createIdComponent()}
                colorScheme="teal"
                size="sm"
                mt="20px"
                onClick={() => {
                  updateGeoSelection(
                    geoSelection.id,
                    geoSelection.featureSelected,
                    geoSelection.name,
                    geoSelection.scale
                  );
                }}
              >
                Edit
              </Button>
              <Button
                id={createIdComponent()}
                colorScheme="teal"
                size="sm"
                mt="20px"
                onClick={() => {
                  setSeeSelections(false);
                  setScale(geoSelection.scale);
                  updateGeoSelection(
                    geoSelection.id,
                    geoSelection.featureSelected,
                    geoSelection.name,
                    geoSelection.scale
                  );
                }}
              >
                Edit in map
              </Button>
            </Flex>
          </Flex>
        );
      })}
    </>
  );
};

export default GeoSelectionsDetails;
