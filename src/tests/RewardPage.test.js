import { render, screen } from '@testing-library/react';
import CustomerListItem from '../screens/RewardPage/components/CustomerTableItem';

describe("Customer table item should render correctly", () => {
    const cust = {
        customer_id: 1,
        amount: 550,
        monthlySpending: [
            {
                amount: 320,
                month: "January 2022",
                points: 260
            },
            {
                amount: 80,
                month: "February 2022",
                points: 260
            },
            {
                amount: 150,
                month: "March 2022",
                points: 260
            }
        ],
    };

    test('should render total spending', () => {
        render(
            <table>
                <tbody>
                    <CustomerListItem cust={cust} />
                </tbody>
            </table>
        );

        const totalSpendingElement = screen.getByText(/\$550/i);
        expect(totalSpendingElement).toBeInTheDocument();
    });
})