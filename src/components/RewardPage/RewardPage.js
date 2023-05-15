import React from 'react'
import useRequest from '../../utils/useRequest'
import style from './style.module.css'
import { calculateAwardPoints, formatMonth } from '../../utils'

const RewardPage = () => {
    const { data, isLoading, error } = useRequest('/purchaseHistory')

    /*
        
        {
            customer_id: int,
            totalAmount: int,
            monthlyTransactions: Array({month: string, amount: int, points: int})
        }; 
    */
    function formatCustomerData(transactions) {
        const customerMap = new Map();

        for (const transaction of transactions) {
            const { customer_id, date, amount } = transaction;

            const month = new Date(date * 1000).toString();

            if (customerMap.has(customer_id)) {
                const customerData = customerMap.get(customer_id);
                customerData.amount += amount;

                const index = customerData.monthlySpending.findIndex(item => item.month === month);
                const awardPoints = calculateAwardPoints(amount)

                if (index !== -1) {
                    customerData.monthlySpending[index].amount += amount
                    customerData.monthlySpending[index].points += awardPoints
                } else {
                    customerData.monthlySpending.push({
                        month: month,
                        amount: amount,
                        points: awardPoints
                    })
                }
            } else {
                customerMap.set(customer_id, {
                    customer_id,
                    amount,
                    monthlySpending: [{
                        month: month,
                        amount: amount,
                        points: calculateAwardPoints(amount)
                    }],
                });
            }
        }

        const totalSpending = Array.from(customerMap.values());

        console.log(totalSpending)
        return totalSpending;
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
        <div className={style.RewardPage}>
            <ul className={style.customerList}>
                {
                    data && formatCustomerData(data).map(cust => {
                        return (
                            <li className={style.customerItem} key={cust.customer_id}>
                                <div className={style.customerInfoWrapper}>
                                    <h2>Customer ID: {cust.customer_id}</h2>
                                    <p>Total spending: {cust.amount}</p>
                                    <p>Total award: {calculateAwardPoints(cust.amount)}</p>
                                </div>

                                <ol className={style.monthlyList}>
                                    {
                                        cust.monthlySpending.map(month => {
                                            return (
                                                <li key={month.month}>
                                                    <strong>{formatMonth(month.month)}</strong>
                                                    <div>Spending: {month.amount}</div>
                                                    <div>Award Points: {month.points}</div>
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