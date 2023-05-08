import { useDispatch } from "react-redux";

import { update } from "store/ControlPanel";

export default function useUpdateControlPanel() {
    const dispatch = useDispatch();
    return (chunk) => {
        dispatch(update(chunk));
    };
}
