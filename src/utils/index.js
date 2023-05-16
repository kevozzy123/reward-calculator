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
    console.log(time)
    return time;
}