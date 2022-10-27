import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {bestRateFetched} from "../allocations/store";
import {Card} from "../presentation/Panels";
import {formatRate} from "../presentation/formatting";
import {fetchJson} from "../http/request";
import {errorsAdded} from "../errors/store";

export const BestRate = () => {
  const dispatch = useDispatch()

  const bestAllocation = useSelector(x => x.allocations.bestRate)

  useEffect(() => {
    fetchJson(`/api/best-rate`, dispatch)
      .then(x => dispatch(bestRateFetched(x)))
      .catch(e => dispatch(errorsAdded(e.message)));
  }, [])

  return (
    <div data-testid="allocation-c020b901">
      <Card>
        Best rate: {formatRate(bestAllocation.rate)} ({bestAllocation.name})
      </Card>
    </div>
  )
}
