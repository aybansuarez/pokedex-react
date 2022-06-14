import { getTypeIcon } from "/src/utils/getIcons";
import { Fragment } from "react";

function TypeIcon({ type, className }) {
  return (
    <Fragment>
      <div className="relative flex flex-col items-center">
        <img src={getTypeIcon(type)} className={className} />
      </div>
    </Fragment>
  );
}

export default TypeIcon;
