// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Simulator from "components/simulator/index";
import DataFitContext from "context/DataFitContext";
import GraphicsContext from "context/GraphicsContext";
import NewModelsContext from "context/NewModelsContext";
import SelectFeatureContext from "context/SelectFeaturesContext";
import SimulationContext from "context/SimulationContext";

const Home = () => {
    return (
        <SimulationContext>
            <NewModelsContext>
                <SelectFeatureContext>
                    <GraphicsContext>
                        <DataFitContext>
                            <Simulator />
                        </DataFitContext>
                    </GraphicsContext>
                </SelectFeatureContext>
            </NewModelsContext>
        </SimulationContext>
    );
};

export default Home;
