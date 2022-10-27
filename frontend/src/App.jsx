import React from "react";
import {useSelector} from "react-redux";
import {Card} from "./components/presentation/Panels";
import {FEATURES} from "./features";
import {BestRate} from "./components/container/BestRate";
import {AllocationsCalculator} from "./components/container/AllocationsCalculator";
import {VerticalContainer} from "./components/presentation/VerticalContainer";

export const App = () => {
  const features = useSelector(x => x.features)
  const featureMultipleTiersOn = features[FEATURES.MULTIPLE_TIERS] === "on";

  return (
    <VerticalContainer>
      <BestRate />
      {featureMultipleTiersOn
        ? <AllocationsCalculator />
        : null
      }
      <Card>
        <p>WAGMI</p>
      </Card>
    </VerticalContainer>
  );
}
