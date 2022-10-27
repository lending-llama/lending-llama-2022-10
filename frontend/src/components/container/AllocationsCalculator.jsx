import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Card} from "../presentation/Panels";
import {InputWithLabel} from '../presentation/InputGroups'
import {AllocationsTable} from "../presentation/AllocationsTable";
import {errorsAdded} from "../../redux/actions/errors";
import {multipleTiersFetched} from "../../redux/actions/allocations";

export const AllocationsCalculator = () => {
  const dispatch = useDispatch()

  const [amount, setAmount] = useState(0.1);

  const allocations = useSelector(x=>x.allocations.multipleTiers)
  useEffect(() => {
    fetch(`/api/allocations?amount=${amount}`)
      .then(async x => {
        if (x.status >= 400) {throw new Error(await x.text())}
        return x
      })
      .then(x=>x.json())
      .then(x=>dispatch(multipleTiersFetched(x)))
      .catch(e => dispatch(errorsAdded(e.message)))
  }, [amount])

  return (
    <Card>
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
