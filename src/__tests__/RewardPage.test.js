import { render, screen } from '@testing-library/react';
import CustomerListItem from '../components/RewardPage/components/CustomerListItem';

test('renders customer ID', () => {
    const cust = {
        customer_id: 1,
        amount: 100,
        monthlySpending: [],
    };

    render(<CustomerListItem cust={cust} />);

    const customerIdElement = screen.getByText(/Customer ID: 1/i);
    expect(customerIdElement).toBeInTheDocument();
});

test('renders total spending', () => {
    const cust = {
        customer_id: 1,
        amount: 100,
        monthlySpending: [],
    };

    render(<CustomerListItem cust={cust} />);

    const totalSpendingElement = screen.getByText(/Total spending: \$100/i);
    expect(totalSpendingElement).toBeInTheDocument();
});

test('renders total award points', () => {
    const cust = {
        customer_id: 1,
        amount: 100,
        monthlySpending: [{ month: '2023-01-01', amount: 50, points: 10 }],
    };

    render(<CustomerListItem cust={cust} />);

    const totalAwardElement = screen.getByText(/Total award: 10 points/i);
    expect(totalAwardElement).toBeInTheDocument();
});
