import { Icon } from "@chakra-ui/react";
import React from "react";

interface SVGRProps {
  onClick: React.MouseEventHandler<SVGSVGElement>;
}
export const ShowSelectorMap = React.forwardRef<SVGSVGElement, SVGRProps>(
  (props, ref) => {
    return (
      <Icon {...props} ref={ref} viewBox="0 0 40 40" boxSize="30px">
        <path
          d="M0 6C0 2.68629 2.68629 0 6 0H34C37.3137 0 40 2.68629 40 6V34C40 37.3137 37.3137 40 34 40H6C2.68629 40 0 37.3137 0 34V6Z"
          fill="#16609E"
        />
        <path
          d="M6 1H34V-1H6V1ZM39 6V34H41V6H39ZM34 39H6V41H34V39ZM1 34V6H-1V34H1ZM6 39C3.23858 39 1 36.7614 1 34H-1C-1 37.866 2.13401 41 6 41V39ZM39 34C39 36.7614 36.7614 39 34 39V41C37.866 41 41 37.866 41 34H39ZM34 1C36.7614 1 39 3.23858 39 6H41C41 2.13401 37.866 -1 34 -1V1ZM6 -1C2.13401 -1 -1 2.13401 -1 6H1C1 3.23858 3.23858 1 6 1V-1Z"
          fill="#EEEEEE"
        />
        <path
          d="M16.0039 25.414L7.39691 34.021L5.98291 32.607L14.5889 24H7.00391V22H18.0039V33H16.0039V25.414Z"
          fill="#EEEEEE"
        />
        <path
          d="M23.9961 14.586L32.6031 5.979L34.0171 7.393L25.4111 16H32.9961V18H21.9961V7H23.9961V14.586Z"
          fill="#EEEEEE"
        />
      </Icon>
    );
  }
);

export const HideSelectorMap = React.forwardRef<SVGSVGElement, SVGRProps>(
  (props, ref) => {
    return (
      <Icon {...props} ref={ref} viewBox="0 0 40 40" boxSize="30px">
        <path
          d="M0 6C0 2.68629 2.68629 0 6 0H34C37.3137 0 40 2.68629 40 6V34C40 37.3137 37.3137 40 34 40H6C2.68629 40 0 37.3137 0 34V6Z"
          fill="#16609E"
        />
        <path
          d="M7.99609 30.586L16.6031 21.979L18.0171 23.393L9.41109 32H16.9961V34H5.99609L5.99609 23H7.99609L7.99609 30.586Z"
          fill="white"
        />
        <path
          d="M32.0039 9.414L23.3969 18.021L21.9829 16.607L30.5889 8H23.0039V6H34.0039V17H32.0039V9.414Z"
          fill="white"
        />
      </Icon>
    );
  }
);
