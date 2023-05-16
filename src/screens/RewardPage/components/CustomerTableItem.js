import React from 'react'
import style from '../style.module.css';
import { formatMonth, sumPoints, sortByDate } from '../../../utils';

const CustomerTableItem = ({ cust }) => {

    return (
        <tr className={style.customerRow} key={cust.customer_id}>
            <td>{cust.customer_id}</td>
            <td>{cust.name}</td>
            <td>${cust.amount}</td>
            <td>
                <strong className={style.rewardText} data-testid="total-award">
                    {sumPoints(cust.monthlySpending)}
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
                        {sortByDate(cust.monthlySpending).map((month) => (
                            <tr key={month.month}>
                                <td>{formatMonth(month.month)}</td>
                                <td>${month.amount}</td>
                                <td>
                                    <strong className={style.rewardText}>
                                        {month.points}
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