import React from "react";
import {useSelector} from "react-redux";
import {Card} from "./presentation/Panels";
import {FEATURES} from "./domain/features/features";
import {BestRate} from "./domain/best_rate/BestRate";
import {AllocationsCalculator} from "./domain/allocations/AllocationsCalculator";
import {VerticalContainer} from "./presentation/VerticalContainer";

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
