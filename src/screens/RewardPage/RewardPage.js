import React, { Fragment, useMemo } from 'react'
import useRequest from '../../utils/useRequest'
import style from './style.module.css'
import { formatCustomerData } from '../../utils'
import CustomerTableItem from './components/CustomerTableItem'

const RewardPage = () => {
    const { data: transactionData, isLoading, error } = useRequest('/purchaseHistory')

    const sortedCustomerData = useMemo(() => {
        if (!transactionData) return [];
        return formatCustomerData(transactionData).sort((a, b) => {
            return a.customer_id - b.customer_id;
        })
    }, [transactionData])

    // a simplified loading UI
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
            <table className={style.customerTable}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Total Spending</th>
                        <th>Total Award</th>
                        <th>Monthly Spending</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedCustomerData.map((cust) => (
                        <Fragment key={cust.customer_id}>
                            <CustomerTableItem cust={cust} />
                        </Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default RewardPage