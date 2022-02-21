import Simulator from "components/simulator/index";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ControlPanelContext from "context/ControlPanelContext";
import GraphicsContext from "context/GraphicsContext";
import ModelsContext from "context/ModelsContext";
import SelectFeatureContext from "context/SelectFeaturesContext";
import SimulationContext from "context/SimulationContext";

const Home = () => {
    return (
        <SimulationContext>
            <ModelsContext>
                <ControlPanelContext>
                    <SelectFeatureContext>
                        <GraphicsContext>
                            <Simulator />
                        </GraphicsContext>
                    </SelectFeatureContext>
                </ControlPanelContext>
            </ModelsContext>
        </SimulationContext>
    );
};

export default Home;
