import {
  Text,
  Accordion,
  AccordionPanel,
  AccordionButton,
  AccordionItem,
  Box,
  Flex,
  AccordionIcon,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

import countiesData from "../../../data/counties.json";
import stateData from "../../../data/states.json";

interface DataGeoSelections {
  id: number;
  name: string;
  mode: string;
  featureSelected: string[];
}
interface Props {
  details: DataGeoSelections[];
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
type Acc = ObjStatesCounties[] | [];

const GeoSelectionsDetails = ({ details }: Props) => {
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
      if (det.mode === "States") {
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

  return (
    <>
      {geoSelectionsDetails.map((geoSelection) => {
        return (
          <Flex direction="column">
            <Text textAlign="center" fontWeight="400">
              {geoSelection.name}
            </Text>
            <Box overflowY="auto">
              {geoSelection.mode === "States" &&
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

              {geoSelection.mode === "Counties" && (
                <Accordion allowMultiple>
                  {countiesOrdered?.map((c: ObjStatesCounties) => {
                    const checkbox = c.counties.map((cc) => {
                      return (
                        <Flex
                          key={cc.value}
                          justifyContent="space-between"
                          px="1.5rem"
                        >
                          <Text fontSize="14px" color="gray.600">
                            {cc.label}
                          </Text>
                        </Flex>
                      );
                    });
                    return (
                      <AccordionItem>
                        <h2>
                          <AccordionButton>
                            <Box flex="1" textAlign="left" fontSize="14px">
                              {c.labelState}
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel>{checkbox}</AccordionPanel>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              )}
            </Box>
          </Flex>
        );
      })}
    </>
  );
};

export default GeoSelectionsDetails;
