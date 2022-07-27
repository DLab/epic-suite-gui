/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

import { ActionsEpidemicData, EpidemicsData } from "types/ControlPanelTypes";

import { initialState } from "./reducer";

interface ActionReducerControlPanel {
    type: string;
    payload: ActionsEpidemicData;
}

export const counterSlice = createSlice({
    name: "controlPanel",
    initialState,
    reducers: {
        update: (
            state: EpidemicsData = initialState,
            action: ActionReducerControlPanel
        ) => {
            if (action.payload.type === "set") {
                if (action.payload.positionVariableDependentTime >= 0) {
                    state[action.payload.target][
                        action.payload.positionVariableDependentTime
                    ] = action.payload.payload;
                } else {
                    state[action.payload.target] = action.payload.payload;
                }
            }
            if (action.payload.type === "setVariableDependent") {
                if (action.payload.positionVariableDependentTime >= 0) {
                    state[action.payload.target][
                        action.payload.positionVariableDependentTime
                    ] = action.payload.payloadVariableDependent;
                } else {
                    state[action.payload.target] =
                        action.payload.payloadVariableDependent;
                }
            }
            if (action.payload.type === "add") {
                return {
                    ...state,
                    ...action.payload.updateData,
                };
            }
            if (action.payload.type === "update") {
                return action.payload.updateData;
            }
            if (action.payload.type === "switch") {
                if (action.payload.positionVariableDependentTime >= 0) {
                    state[action.payload.target][
                        action.payload.positionVariableDependentTime
                    ].isEnabled = action.payload.switch;
                } else {
                    state[action.payload.target].isEnabled =
                        action.payload.switch;
                }
            }
            return state;
        },
    },
});

// Action creators are generated for each case reducer function
export const { update } = counterSlice.actions;

export default counterSlice.reducer;
