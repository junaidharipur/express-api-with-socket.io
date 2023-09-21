import { CirclesWithBar } from "react-loader-spinner";

import Styles from "./Spinner.module.css";

export function Spinner() {
  return (
    <div className={Styles.overlay}>
      <CirclesWithBar
        height="100"
        width="100"
        color="#4fa94d"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        outerCircleColor=""
        innerCircleColor=""
        barColor=""
        ariaLabel="circles-with-bar-loading"
      />
    </div>
  );
}
