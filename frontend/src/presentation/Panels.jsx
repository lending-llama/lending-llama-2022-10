import React from "react";

/*
 cp. https://tailwindui.com/components/application-ui/layout/panels
 */

export const Card = ({header, children}) => {
  const additionalClassesWithHeader = header ? " divide-y divide-gray-200" : "";
  return <div className={'bg-white overflow-hidden shadow rounded-lg' + additionalClassesWithHeader}>
    {header ? <div className="px-4 py-5 sm:px-6">
      {header}
    </div> : null}
    <div className="px-4 py-5 sm:p-6">
      {children}
    </div>
  </div>;
}
