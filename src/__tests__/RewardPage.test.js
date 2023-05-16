import { render, screen } from '@testing-library/react';
import CustomerListItem from '../screens/RewardPage/components/CustomerTableItem';

describe("Customer table item should render correctly", () => {
    const cust = {
        customer_id: 1,
        amount: 550,
        monthlySpending: [
            {
                amount: 320,
                month: "Sat Jan 15 2022 00:20:00 GMT-0500 (Eastern Standard Time)",
                points: 260
            },
            {
                amount: 80,
                month: "Thu Feb 10 2022 00:20:00 GMT-0500 (Eastern Standard Time)",
                points: 260
            },
            {
                amount: 150,
                month: "Tue Mar 15 2022 22:01:48 GMT-0400 (Eastern Daylight Time)",
                points: 260
            }
        ],
    };

    test('should render total spending', () => {
        render(<CustomerListItem cust={cust} />);

        const totalSpendingElement = screen.getByText(/\$550/i);
        expect(totalSpendingElement).toBeInTheDocument();
    });
})