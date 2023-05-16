import { calculateAwardPoints } from "../../../utils";

/**
 * 
 * @param {Object[]} transactions 
 * @returns The formatted array for each customer and their purchase history
 */
export function formatCustomerData(transactions) {
    const customerMap = new Map();

    for (const transaction of transactions) {
        const { customer_id, date, amount } = transaction;

        let month = new Date(date * 1000).toString();

        if (customerMap.has(customer_id)) {
            let customerData = customerMap.get(customer_id);
            customerData.amount += amount;

            let index = customerData.monthlySpending.findIndex(item => item.month === month);
            let awardPoints = calculateAwardPoints(amount);

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

    return totalSpending;
}