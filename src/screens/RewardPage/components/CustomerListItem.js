import React from 'react'
import style from '../style.module.css';
import { formatMonth } from '../../../utils';

const CustomerListItem = ({ cust }) => {

    const sumPoints = (monthlyPoints) => {
        return monthlyPoints.reduce((accumulator, currentPoint) => {
            return accumulator + currentPoint.points
        }, 0)
    }

    const sortByDate = (monthlySpending) => {
        return monthlySpending.sort((a, b) => {
            return new Date(a.month) - new Date(b.month);
        })
    }
    return (
        <li className={style.customerItem} >
            <div className={style.customerInfoWrapper}>
                <h2>Customer ID: {cust.customer_id}</h2>
                <p>Total spending: ${cust.amount}</p>
                <p className={style.rewardText}>Total award: {sumPoints(cust.monthlySpending)} points</p>
            </div>

            <ol className={style.monthlyList}>
                {
                    sortByDate(cust.monthlySpending).map(month => {
                        return (
                            <li key={month.month}>
                                <strong>{formatMonth(month.month)}</strong>
                                <div>Spending: ${month.amount}</div>
                                <div className={style.rewardText}>Award Points: {month.points} points</div>
                            </li>
                        )
                    })
                }
            </ol>
        </li>
    )
}

export default CustomerListItem