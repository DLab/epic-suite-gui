import { DeleteIcon } from "@chakra-ui/icons";
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
import { useContext } from "react";

import countiesData from "../../data/counties.json";
import stateData from "../../data/states.json";
import { SelectFeature } from "context/SelectFeaturesContext";
import { DataCountiesObj, ObjStatesCounties } from "types/SelectFeaturesTypes";
import createIdComponent from "utils/createIdcomponent";

interface StatesSelected {
  stateSelected?: string[];
  countiesSelected?: string[];
}

type Acc = ObjStatesCounties[] | [];
const StatesSelectedCheckbox = ({
  stateSelected,
  countiesSelected,
}: StatesSelected) => {
  const { setStates, setCounties } = useContext(SelectFeature);

  const sortStrings = (property: string) => (a, b) => {
    if (a[property] > b[property]) {
      return 1;
    }
    if (a[property] < b[property]) {
      return -1;
    }
    return 0;
  };
  const statesOrdered = stateSelected
    ? stateSelected
        .map((e) => ({
          value: e,
          label: stateData.data.find((s) => s[0] === e)[2],
        }))
        .sort(sortStrings("value"))
    : [];

  const countiesOrdered = countiesSelected
    ? countiesData.data
        .filter(
          (c) => countiesSelected.includes(`${c[5]}`)
          // filter all counties includes in selection
        )
        .reduce((acc: Acc, item) => {
          // reduce all data in a object
          const obj: ObjStatesCounties = {
            state: item[0] as string,
            labelState: item[2] as string,
            counties: [{ value: item[5], label: item[4] }] as DataCountiesObj[],
          };
          const indexState = acc.findIndex(
            (c: ObjStatesCounties) => c.state === item[0]
          );
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

  return (
    <Box id={createIdComponent()} overflowY="auto">
      {stateSelected &&
        statesOrdered.map((s) => {
          return (
            <Flex
              id={createIdComponent()}
              key={s.value}
              justifyContent="space-between"
              px="1.5rem"
              fontSize="14px"
            >
              {s.label}
              <DeleteIcon
                id={createIdComponent()}
                color="red.800"
                onClick={() =>
                  setStates({ type: "remove-one", payload: [s.value] })
                }
              />
            </Flex>
          );
        })}
      {countiesSelected && (
        <Accordion id={createIdComponent()} allowMultiple>
          {countiesOrdered.map((c: ObjStatesCounties) => {
            const checkbox = c.counties.map((cc) => {
              return (
                <Flex
                  id={createIdComponent()}
                  key={cc.value}
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
                  <DeleteIcon
                    id={createIdComponent()}
                    color="red.800"
                    onClick={() => {
                      setCounties({
                        type: "remove-one",
                        payload: [cc.value],
                      });
                    }}
                  />
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
  );
};

export default StatesSelectedCheckbox;
