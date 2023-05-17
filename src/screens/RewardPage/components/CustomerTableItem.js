import React from 'react'
import style from '../style.module.css';
import { sortByDate } from '../../../utils';

const CustomerTableItem = ({ cust }) => {

    return (
        <tr className={style.customerRow} key={cust.customer_id}>
            <td>{cust.customer_id}</td>
            <td>{cust.name}</td>
            <td>${cust.amount}</td>
            <td>
                <strong className={style.rewardText} data-testid="total-award">
                    {cust.totalPoints}
                </strong>
                &nbsp;points
            </td>
            <td>
                <table className={style.monthlyTable}>
                    <thead>
                        <tr>
                            <th>Month</th>
                            <th>Spending</th>
                            <th>Reward Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(cust.monthlySpending).map((key) => (
                            <tr key={key}>
<<<<<<< HEAD
                                <td className={style.dateCol}>{key}</td>
=======
                                <td>{key}</td>
>>>>>>> 603f452 (fix bug where monthly points isnt added correctly)
                                <td>${cust.monthlySpending[key].amount}</td>
                                <td>
                                    <strong className={style.rewardText}>
                                        {cust.monthlySpending[key].points}
                                    </strong>
                                    &nbsp;points
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </td>
        </tr>
    )
}

export default CustomerTableItem