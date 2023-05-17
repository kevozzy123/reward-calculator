export const sameCustomerSameMonth = {
    transactions: [
        {
            customer_id: 1,
            name: "John",
            date: 1642224000,
            amount: 120,
        },
        {
            customer_id: 1,
            name: "John",
            date: 1642224000,
            amount: 160,
        },
        {
            customer_id: 1,
            name: "John",
            date: 1643643600,
            amount: 80,
        },
    ],
    expectedOutput: [
        {
            customer_id: 1,
            amount: 360,
            name: "John",
            totalPoints: 290,
            monthlySpending: {
                "January 2022": {
                    points: 290,
                    amount: 360,
                },
            },
        },
    ],
};

export const diffCustomerDiffMonth = {
    transactions: [
        {
            customer_id: 2,
            name: "Skylar",
            date: 1641340800,
            amount: 60,
        },
        {
            customer_id: 2,
            name: "Skylar",
            date: 1645334400,
            amount: 100,
        },
        {
            customer_id: 2,
            name: "Skylar",
            date: 1646784000,
            amount: 75,
        },
        {
            customer_id: 3,
            name: "Jesse",
            date: 1647396108,
            amount: 200,
        },
    ],
    expectedOutput: [
        {
            customer_id: 2,
            amount: 235,
            name: "Skylar",
            totalPoints: 85,
            monthlySpending: {
                "January 2022": {
                    points: 10,
                    amount: 60,
                },
                "February 2022": {
                    points: 50,
                    amount: 100,
                },
                "March 2022": {
                    points: 25,
                    amount: 75,
                },
            },
        },
        {
            customer_id: 3,
            amount: 200,
            name: "Jesse",
            totalPoints: 250,
            monthlySpending: {
                "March 2022": {
                    points: 250,
                    amount: 200,
                }
            },
        }
    ],
};
