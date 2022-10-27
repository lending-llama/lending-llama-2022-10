import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {bestRateFetched} from "../../redux/actions/allocations";
import {Card} from "../presentation/Panels";
import {formatRate} from "../../utils/formatting";

export const BestRate = () => {
  const dispatch = useDispatch()

  const bestAllocation = useSelector(x => x.allocations.bestRate)
  useEffect(() => {
    fetch(`/api/best-rate`)
      .then(x => x.json())
      .then(x => dispatch(bestRateFetched(x)))
  }, [])

  return (
    <div data-testid="allocation-c020b901">
      <Card>
        Best rate: {formatRate(bestAllocation.rate)} ({bestAllocation.name})
      </Card>
    </div>
  )
}
