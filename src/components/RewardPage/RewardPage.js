import React from 'react'
import useRequest from '../../utils/useRequest'
import style from './style.module.css'
import { formatMonth } from '../../utils'
import { formatCustomerData } from './utils'

const RewardPage = () => {
    const { data: transactionData, isLoading, error } = useRequest('/purchaseHistory')

    const sumPoints = (monthlyPoints) => {
        return monthlyPoints.reduce((accumulator, currentPoint) => {
            return accumulator + currentPoint.points
        }, 0)
    }

    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }

    // a simplified error handling
    if (error) {
        return (
            <div>Something went wrong, please try again</div>
        )
    }

    return (
        <div className={style.rewardPage}>
            <ul className={style.customerList}>
                {
                    transactionData && formatCustomerData(transactionData).map(cust => {
                        return (
                            <li className={style.customerItem} key={cust.customer_id}>
                                <div className={style.customerInfoWrapper}>
                                    <h2>Customer ID: {cust.customer_id}</h2>
                                    <p>Total spending: ${cust.amount}</p>
                                    <p className={style.rewardText}>Total award: {sumPoints(cust.monthlySpending)} points</p>
                                </div>

                                <ol className={style.monthlyList}>
                                    {
                                        cust.monthlySpending.map(month => {
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
                    })
                }
            </ul>
        </div>
    )
}

export default RewardPage