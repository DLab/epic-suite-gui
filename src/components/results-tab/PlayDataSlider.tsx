import {
    Flex,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    IconButton,
} from "@chakra-ui/react";
import React from "react";

import PauseIcon from "components/icons/PauseIcon";
import PlayIcon from "components/icons/PlayIcon";
import { MapResultsData } from "types/GraphicsTypes";

interface Props {
    map: MapResultsData;
    isPlaying: boolean;
    setIsPlaying: (val: boolean) => void;
    simDay: number;
    setSimDay: (val: number) => void;
}

const PlayDataSlider = ({
    map,
    isPlaying,
    setIsPlaying,
    simDay,
    setSimDay,
}: Props) => {
    return (
        <Flex w="95%" m="2% 0">
            {!isPlaying ? (
                <IconButton
                    fontSize="20px"
                    bg="#16609E"
                    color="#FFFFFF"
                    fill="white"
                    aria-label="Play"
                    size="sm"
                    cursor="pointer"
                    icon={<PlayIcon />}
                    mr="1rem"
                    onClick={() => {
                        setIsPlaying(true);
                    }}
                />
            ) : (
                <IconButton
                    fontSize="20px"
                    bg="#16609E"
                    color="#FFFFFF"
                    fill="white"
                    aria-label="Play"
                    size="sm"
                    cursor="pointer"
                    icon={<PauseIcon />}
                    mr="1rem"
                    onClick={() => {
                        setIsPlaying(false);
                    }}
                />
            )}

            <Slider
                aria-label="slider-ex-1"
                defaultValue={1}
                max={parseInt(map.duration.toString(), 10) - 1}
                value={simDay}
                onChange={(value) => {
                    setSimDay(value);
                    setIsPlaying(false);
                }}
            >
                <SliderTrack>
                    <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
            </Slider>
        </Flex>
    );
};

export default PlayDataSlider;
