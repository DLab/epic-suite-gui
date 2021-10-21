import { SettingsIcon, EditIcon } from "@chakra-ui/icons";
import {
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Icon,
} from "@chakra-ui/react";

import SelectorMap from "components/map-results/SelectorMap";

import ControlPanel from "./ControlPanel";

const SimulatorTabs = () => {
  return (
    <Tabs>
      <TabList>
        <Tab>
          <Icon as={EditIcon} />
        </Tab>
        <Tab>
          <Icon as={SettingsIcon} />
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <SelectorMap />
        </TabPanel>
        <TabPanel>
          <ControlPanel />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default SimulatorTabs;
