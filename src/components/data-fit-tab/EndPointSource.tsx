import { Select, Text, Box } from "@chakra-ui/react";
import { format } from "date-fns";
import React, { useContext } from "react";
import DatePicker from "react-datepicker";

import { SelectFeature } from "context/SelectFeaturesContext";

interface Props {
    startDate: Date;
    setStartDate: (value: Date) => void;
    value: number;
    setValue: (value: number) => void;
}

const EndPointSource = ({
    startDate,
    setStartDate,
    value,
    setValue,
}: Props) => {
    const { geoSelections } = useContext(SelectFeature);
    return (
        <Box ml="5%">
            <Box mb="3%">
                <Text fontSize="14px" fontWeight={500}>
                    Date
                </Text>
                <DatePicker
                    dateFormat="yyyy/MM/dd"
                    selected={startDate}
                    onChange={(date) => {
                        const newDate = format(date, "yyyy/MM/dd");
                        setStartDate(new Date(newDate));
                    }}
                    openToDate={new Date()}
                />
            </Box>
            <Box mb="3%">
                <Text fontSize="14px" fontWeight={500}>
                    Area Selected
                </Text>
                <Select
                    w="13rem"
                    fontSize="14px"
                    size="sm"
                    placeholder="Name Selection"
                    value={value}
                    onChange={(e) => {
                        setValue(+e.target.value);
                    }}
                >
                    {geoSelections.length > 0 &&
                        geoSelections.map((e) => {
                            return (
                                <option key={e.id} value={e.id}>
                                    {e.name}
                                </option>
                            );
                        })}
                </Select>
            </Box>
        </Box>
    );
};

export default EndPointSource;
