import React from "react";
import styles from "./Loader.module.css";
import { Circles } from "react-loader-spinner";

function Loader () {
    return (
      <>
        <div className={styles.loaderContainer}>
          <Circles
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="circles-loading"
          visible={true}
          />
        </div>
      </>
    )
}

export default Loader;