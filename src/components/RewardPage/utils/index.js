import { calculateAwardPoints } from "../../../utils";

/*
    
    {
        customer_id: int,
        totalAmount: int,
        monthlyTransactions: Array({month: string, amount: int, points: int})
    }; 
*/
export function formatCustomerData(transactions) {
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