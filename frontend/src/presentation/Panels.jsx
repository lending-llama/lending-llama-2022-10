import React from "react";

/*
 cp. https://tailwindui.com/components/application-ui/layout/panels
 */

export const Card = ({header, children}) =>
  <div className={ `bg-white overflow-hidden shadow rounded-lg${header ? " divide-y divide-gray-200" : ""}`}>
    {header ? <div className="px-4 py-5 sm:px-6">
      {header}
    </div> : null}
    <div className="px-4 py-5 sm:p-6">
      {children}
    </div>
  </div>
