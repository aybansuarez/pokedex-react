import { getTypeIcon } from "/src/utils/getIcons";
import { Fragment, useState } from "react";
import { getCapitalizedString } from "/src/utils/common";

function TypeIcon({ type, className }) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <Fragment>
      <div className="relative flex flex-col items-center">
        <div
          className={`absolute bottom-0 mb-6 flex-col items-center ${
            showTooltip ? "flex" : "hidden"
          }`}
        >
          <span className="relative z-10 rounded bg-slate-800 p-2 text-xs leading-none text-white shadow-lg">
            {getCapitalizedString(type)}
          </span>
          <div className="-mt-2 h-3 w-3 rotate-45 bg-slate-800" />
        </div>
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
