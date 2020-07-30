import React from "react";

export const LeftChevron: React.FC<JSX.IntrinsicElements["svg"]> = props => (
  <svg
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    stroke="currentColor"
    {...props}
  >
    <path d="M15 19l-7-7 7-7"></path>
  </svg>
);

export const Up: React.FC<JSX.IntrinsicElements["svg"]> = props => (
  <svg
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    stroke="currentColor"
    {...props}
  >
    <path d="M8 7l4-4m0 0l4 4m-4-4v18"></path>
  </svg>
);
