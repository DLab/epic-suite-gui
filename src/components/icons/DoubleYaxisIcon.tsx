import { createIcon } from "@chakra-ui/icons";

const DoubleYaxisIcon = createIcon({
    displayName: "DoubleYaxisIcon",
    viewBox: "0 0 75 67",

    path: (
        <>
            <line
                x1="9.5"
                y1="3"
                x2="9.5"
                y2="63"
                stroke="#16609E"
                strokeWidth="5"
            />
            <line
                x1="8"
                y1="61.5"
                x2="68"
                y2="61.5"
                stroke="#16609E"
                strokeWidth="5"
            />
            <path
                d="M63.25 57.6029L70 61.5L63.25 65.3971V57.6029Z"
                fill="#16609E"
                stroke="#16609E"
                strokeWidth="5"
            />
            <path
                d="M39.7227 50.4688L41.7734 53.7383L43.8242 50.4688H45.1426L42.4473 54.6934L45.207 59H43.877L41.7734 55.666L39.6699 59H38.3398L41.0996 54.6934L38.4043 50.4688H39.7227Z"
                fill="#16609E"
                strokeWidth="5"
            />
            <path
                d="M1.38281 24.4688L3.59766 28.752L5.81836 24.4688H7.10156L4.16016 29.8125V33H3.0293V29.8125L0.0878906 24.4688H1.38281Z"
                fill="#16609E"
                strokeWidth="5"
            />
            <path
                d="M9.5 0L14.2631 8.25H4.73686L9.5 0Z"
                fill="#16609E"
                strokeWidth="5"
            />
            {/* <path
                d="M9.04175 30.8332V6.1665M14.2084 30.8332H14.1955H14.2084ZM19.3751 30.8332H19.3622H19.3751ZM24.5417 30.8332H24.5288H24.5417ZM5.16675 10.7915L9.04175 6.1665L12.9167 10.7915H5.16675Z"
                stroke="#16609E"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            /> */}
        </>
    ),
});

export default DoubleYaxisIcon;
