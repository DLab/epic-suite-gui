import {
  Checkbox,
  VStack,
  Accordion,
  AccordionPanel,
  AccordionButton,
  AccordionItem,
  Box,
  AccordionIcon,
  Flex,
} from "@chakra-ui/react";
import { useContext } from "react";

import countiesData from "../../data/counties.json";
import stateData from "../../data/states.json";
import SelectFeatureContext from "context/SelectFeaturesContext";

interface StatesSelected {
  stateSelected?: string[];
  countiesSelected?: string[];
  maxWidthFeaturesPanel: string;
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
const StatesSelectedCheckbox = ({
  stateSelected,
  countiesSelected,
  maxWidthFeaturesPanel,
}: StatesSelected) => {
  const { setStates, setCounties } = useContext(SelectFeatureContext);
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
          (c) =>
            // countiesSelected.map((cs) => cs.substring(0, 2)).includes(`${c[0]}`)
            countiesSelected.includes(`${c[5]}`)
          // filter all counties includes in selection
        )
        .reduce((acc: Acc, item) => {
          // reduce all data in a object
          const obj: ObjStatesCounties = {
            state: item[0] as string,
            labelState: item[2] as string,
            counties: [{ value: item[5], label: item[4] }] as DataCountiesObj[],
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
  return (
    <Flex maxHeight={maxWidthFeaturesPanel} overflowY="auto">
      <VStack>
        {stateSelected && (
          <Flex direction="column">
            {statesOrdered.map((s) => {
              return (
                <Checkbox
                  size="sm"
                  defaultIsChecked
                  key={s.value}
                  onChange={() =>
                    setStates({ type: "remove-one", payload: [s.value] })
                  }
                >
                  {s.label}
                </Checkbox>
              );
            })}
          </Flex>
        )}
        {countiesSelected && (
          <Accordion allowMultiple>
            {countiesOrdered.map((c: ObjStatesCounties) => {
              const checkbox = c.counties.map((cc) => {
                if (countiesSelected.includes(cc.value)) {
                  return (
                    <Checkbox
                      onChange={(e) => {
                        setCounties({
                          type: "remove-one",
                          payload: [cc.value],
                        });
                      }}
                      key={cc.value}
                      defaultIsChecked
                    >
                      {cc.label}
                    </Checkbox>
                  );
                }
                return (
                  <Checkbox
                    onChange={(e) => {
                      setCounties({
                        type: "add",
                        payload: [cc.value],
                      });
                    }}
                    key={cc.value}
                  >
                    {cc.label}
                  </Checkbox>
                );
              });
              return (
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
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
      </VStack>
    </Flex>
  );
};

export default StatesSelectedCheckbox;
