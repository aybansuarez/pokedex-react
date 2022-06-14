import { getTypeIcon } from "/src/utils/getIcons";
import { Fragment } from "react";

function TypeIcon({ type, className }) {
  return (
    <Fragment>
      <div className="relative flex flex-col items-center">
        <img
          src={getTypeIcon(type)}
          className={className}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        />
      </div>
    </Fragment>
  );
}

export default TypeIcon;
