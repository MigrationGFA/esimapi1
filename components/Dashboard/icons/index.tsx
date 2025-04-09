// icons.tsx (create or update a file for icons)
import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  color?: string; // Allow a custom color (e.g., Tailwind class or hex value)
}

export const HomeIcon: React.FC<IconProps> = (props) => {
  const { color = "#A2A5B6", ...rest } = props; // Default to gray (#A2A5B6) if no color is provided

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      {...rest}
    >
      <g clipPath="url(#a)">
        <path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.75 20.25v-6h4.5v6h6v-9a.75.75 0 0 0-.22-.53l-7.5-7.5a.749.749 0 0 0-1.06 0l-7.5 7.5a.75.75 0 0 0-.22.53v9h6Z"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h24v24H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const EsimIcon: React.FC<IconProps> = (props) => {
  const { color = "#A2A5B6", ...rest } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      {...rest}
    >
      <g
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        clipPath="url(#a)"
      >
        <path d="M18.75 21H5.25a.75.75 0 0 1-.75-.75V3.75A.75.75 0 0 1 5.25 3h9l5.25 5.25v12a.75.75 0 0 1-.75.75Z" />
        <path d="M16.5 11.25h-9V18h9v-6.75ZM10.5 14.25V18M13.5 14.25V18" />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h24v24H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const PlansIcon: React.FC<IconProps> = (props) => {
  const { color = "#A2A5B6", ...rest } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={19}
      fill="none"
      {...rest}
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
        d="M17 12.496 12.277 17.5M1 12.496h16M1 6.505 5.722 1.5M17 6.505H1"
      />
    </svg>
  );
};

export const ProfileIcon: React.FC<IconProps> = (props) => {
  const { color = "#A2A5B6", ...rest } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={23}
      height={23}
      fill="none"
      {...rest}
    >
      <path
        fill={color}
        d="M11.5 0C5.152 0 0 5.152 0 11.5S5.152 23 11.5 23 23 17.848 23 11.5 17.848 0 11.5 0Zm0 3.45a3.445 3.445 0 0 1 3.45 3.45 3.445 3.445 0 0 1-3.45 3.45A3.445 3.445 0 0 1 8.05 6.9a3.445 3.445 0 0 1 3.45-3.45Zm0 16.33a8.28 8.28 0 0 1-6.9-3.703c.035-2.289 4.6-3.542 6.9-3.542 2.289 0 6.866 1.254 6.9 3.542a8.28 8.28 0 0 1-6.9 3.703Z"
      />
    </svg>
  );
};


export const MenuIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className="h-6 w-6" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M4 6h16M4 12h16M4 18h16" 
    />
  </svg>
);

export const CloseIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className="h-6 w-6" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M6 18L18 6M6 6l12 12" 
    />
  </svg>
);