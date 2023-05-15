/**
 * Calculates the reward points when a transaction is above 50 dollars 
 * 
 * @param {number} amount - Amount of money spent
 * @returns {number} - Calculated reward points
 */
export function calculateAwardPoints(amount) {
    let rewardPoints = 0;

    if (amount > 100) {
        const amountOver100 = amount - 100;

        rewardPoints += amountOver100 * 2 + 50;
    }

    if (amount > 50 && amount <= 100) {
        rewardPoints += amount - 50;
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