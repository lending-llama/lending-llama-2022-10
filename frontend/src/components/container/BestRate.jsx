import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {bestRateFetched} from "../../redux/actions/allocations";
import {Card} from "../presentation/Panels";
import {formatRate} from "../../utils/formatting";
import {fetchJson} from "../../utils/request";
import {errorsAdded} from "../../redux/actions/errors";

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
