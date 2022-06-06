import Simulator from "components/simulator/index";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ControlPanelContext from "context/ControlPanelContext";
import DataFitContext from "context/DataFitContext";
import GraphicsContext from "context/GraphicsContext";
import ModelsContext from "context/ModelsContext";
import NewModelsContext from "context/NewModelsContext";
import SelectFeatureContext from "context/SelectFeaturesContext";
import SimulationContext from "context/SimulationContext";

const Home = () => {
    return (
        <SimulationContext>
            <NewModelsContext>
                <ModelsContext>
                    <ControlPanelContext>
                        <SelectFeatureContext>
                            <GraphicsContext>
                                <DataFitContext>
                                    <Simulator />
                                </DataFitContext>
                            </GraphicsContext>
                        </SelectFeatureContext>
                    </ControlPanelContext>
                </ModelsContext>
            </NewModelsContext>
        </SimulationContext>
    );
};

export default Home;
