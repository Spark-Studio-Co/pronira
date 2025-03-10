const GeoIcon = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    fill="none"
    viewBox="0 0 32 32"
  >
    <path
      fill={props.color}
      strokeLinecap="round"
      strokeOpacity="0.4"
      strokeWidth="1.5"
      d="M18.833 16.157 20.667 18m-1.834-1.843a4 4 0 1 0-5.667-5.648 4 4 0 0 0 5.667 5.648Z"
    ></path>
    <path
      fill={props.color}
      strokeLinecap="round"
      strokeOpacity="0.4"
      strokeWidth="1.5"
      d="M6.667 20.288c-.863-2.205-1.334-4.553-1.334-6.764C5.333 7.528 10.11 2.667 16 2.667c5.89 0 10.667 4.861 10.667 10.857 0 5.95-3.404 12.893-8.716 15.375a4.6 4.6 0 0 1-3.902 0c-1.696-.792-3.198-2.04-4.457-3.566"
    ></path>
  </svg>
);

export default GeoIcon;
