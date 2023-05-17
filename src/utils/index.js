const MINIMUM_AMOUNT = 50;
const MINIMUM_DOUBLE_AMOUNT = 100;
const POINTS_MULTIPLIER = 2;

/**
 * Calculates the reward points when a transaction is above 50 dollars 
 * 
 * @param {number} amount - Amount of money spent
 * @returns {number} - Calculated reward points
 */
export function calculateAwardPoints(amount) {
    let rewardPoints = 0;

    if (amount > MINIMUM_DOUBLE_AMOUNT) {
        const amountOver100 = amount - MINIMUM_DOUBLE_AMOUNT;

        rewardPoints += amountOver100 * POINTS_MULTIPLIER + MINIMUM_AMOUNT;
    } else if (amount > MINIMUM_AMOUNT && amount <= MINIMUM_DOUBLE_AMOUNT) {
        rewardPoints += amount - MINIMUM_AMOUNT;
    }

    return rewardPoints;
}

/**
 * Formats the dateString into this format:  January 2022
 *
 * @param {string} dateString - The first number.
 * @returns {string} -Formatted date string.
 */
export function formatMonth(dateString) {
    const date = new Date(dateString)

    const time = date.toLocaleDateString('en', { year: 'numeric', month: 'long' });
    return time;
}

export const sumPoints = (monthlyPoints) => {
    return monthlyPoints.reduce((accumulator, currentPoint) => {
        return accumulator + currentPoint.points
    }, 0)
}

export const sortByDate = (monthlySpending) => {
    return monthlySpending.sort((a, b) => {
        return new Date(a.month) - new Date(b.month);
    })
}

/**
 * 
 * @param {Object[]} transactions 
 * @returns The formatted array for each customer and their purchase history
 */
export function formatCustomerData(transactions) {
    const customerMap = new Map();

    for (const transaction of transactions) {
        const { customer_id, name, date, amount } = transaction;

        let month = formatMonth(new Date(date * 1000).toString());
        let awardPoints = calculateAwardPoints(amount);

        if (customerMap.has(customer_id)) {
            let customerData = customerMap.get(customer_id);
            customerData.amount += amount;

            let index = customerData.monthlySpending.findIndex(item => item.month === month);

            customerData.totalPoints += awardPoints

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
                name,
                amount,
                totalPoints: awardPoints,
                monthlySpending: [{
                    month: month,
                    amount: amount,
                    points: awardPoints
                }],
            });
        }
    }

    const totalSpending = Array.from(customerMap.values());

    console.log(totalSpending)
    return totalSpending;
}