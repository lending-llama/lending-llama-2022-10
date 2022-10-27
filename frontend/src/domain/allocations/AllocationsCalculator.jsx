import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Card} from "../../presentation/Panels";
import {InputWithLabel} from '../../presentation/InputGroups'
import {AllocationsTable} from "./AllocationsTable";
import {errorsAdded} from "../errors/actions";
import {multipleTiersFetched} from "./actions";
import {fetchJson} from "../../http/request";

export const AllocationsCalculator = () => {
  const dispatch = useDispatch()

  const [amount, setAmount] = useState(0.1);

  const allocations = useSelector(x=>x.allocations.multipleTiers)
  useEffect(() => {
    fetchJson(`/api/allocations?amount=${amount}`, dispatch)
      .then(x=>dispatch(multipleTiersFetched(x)))
      .catch(e => dispatch(errorsAdded(e.message)))
  }, [amount])

  return (
    <Card header="Calculate Allocation for Amount">
      <InputWithLabel
        name="amount"
        label="BTC Amount"
        type="number"
        value={amount}
        step="0.1"
        placeholder="Amount of BTC you want to lend"
        onChange={e => setAmount(e.target.value)}
      />
      <div className="pt-4"><AllocationsTable allocations={allocations}/></div>
    </Card>
  );
}
