import { calculateAwardPoints, formatMonth } from "../utils";
import { renderHook, act } from "@testing-library/react";
import useRequest from "../utils/useRequest";
import { formatCustomerData } from "../utils";
import { diffCustomerDiffMonth, sameCustomerSameMonth } from "./data/transactions";

describe("calculate reward points", () => {
    it("should calculate points correctly for amount over 100", () => {
        const amount = 120;
        const expectedResult = 90

        const amountTwo = 500;
        const expectedResultTwo = 850;

        const result = calculateAwardPoints(amount);
        const resultTwo = calculateAwardPoints(amountTwo);

        expect(result).toBe(expectedResult);
        expect(resultTwo).toBe(expectedResultTwo)
    })

    it("should calculate points for amount below 100 and over 50", () => {
        const amount = 70;
        const expectedResult = 20;

        const result = calculateAwardPoints(amount);

        expect(result).toBe(expectedResult);
    })

    it("should have 0 point at amount below 50", () => {
        const amount = 30;
        const expectedResult = 0;

        const result = calculateAwardPoints(amount);

        expect(result).toBe(expectedResult);
    })

    it("should have 0 point at amount exactly 50", () => {
        const amount = 50;
        const expectedResult = 0;

        const result = calculateAwardPoints(amount);

        expect(result).toBe(expectedResult);
    })

    it("should have 50 point at amount exactly 100", () => {
        const amount = 100;
        const expectedResult = 50;

        const result = calculateAwardPoints(amount);

        expect(result).toBe(expectedResult);
    })
})

describe("format month", () => {
    it('should format date string into "Month Year" format', () => {
        const dateString = '2022-01-1';
        const formattedDate = formatMonth(dateString);

        expect(formattedDate).toBe('January 2022');
    });

    it('should handle different date strings', () => {
        let date1 = 'Monday, 15-May-23 22:24:44 UTC';
        let date2 = 'Mon, 15 May 2023 22:24:44 +0000';
        let date3 = '2023-05-15T22:24:44+00:00';

        const formattedDate1 = formatMonth(date1);
        const formattedDate2 = formatMonth(date2);
        const formattedDate3 = formatMonth(date3);

        expect(formattedDate1).toBe('May 2023');
        expect(formattedDate2).toBe('May 2023');
        expect(formattedDate3).toBe('May 2023');
    });

    it('should throw error when format is invalid', () => {
        let invalidDate = "dfd";

        const formattedDate1 = formatMonth(invalidDate);

        expect(formattedDate1).toBe('Invalid Date');

    })
})

describe("useRequest custom hook", () => {
    let originalFetch;
    const mockUrl = '/api/data';

    beforeEach(() => {
        originalFetch = global.fetch;
    });


    afterEach(() => {
        global.fetch = originalFetch;
    });

    it('should fetch data successfully', async () => {
        const mockData = { id: 1, name: 'John Doe' };

        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(mockData),
        });

        const { result } = renderHook(() => useRequest(mockUrl));

        expect(result.current.data).toBeNull();
        expect(result.current.isLoading).toBe(true);
        expect(result.current.error).toBeNull();

        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 0));
        });

        expect(result.current.data).toEqual(mockData);
        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).toBeNull();
    });

    it('should handle fetch error', async () => {
        global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));

        const { result } = renderHook(() => useRequest(mockUrl));

        expect(result.current.data).toBeNull();
        expect(result.current.isLoading).toBe(true);
        expect(result.current.error).toBeNull();

        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 0));
        });

        expect(result.current.data).toBeNull();
        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).toEqual(new Error('Network error'));
    });

    it("should throw pre-defined error message when responce is not ok", async () => {
        const mockData = { id: 1, name: 'John Doe' };

        global.fetch = jest.fn().mockResolvedValue({
            ok: false,
            json: jest.fn().mockResolvedValue(mockData),
        });

        const { result } = renderHook(() => useRequest(mockUrl));

        expect(result.current.data).toBeNull();
        expect(result.current.isLoading).toBe(true);
        expect(result.current.error).toBeNull();

        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 0));
        });

        expect(result.current.data).toBeNull();
        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).toEqual(new Error('Network response was not ok'));
    })
})

describe('formatCustomerData', () => {


    it('should calculate correctly for a single customer with multiple transactions in the same month', () => {
        const result = formatCustomerData(sameCustomerSameMonth.transactions);

        expect(result).toEqual(sameCustomerSameMonth.expectedOutput);
    });

    it("should calculate correctly for a customers with transactions in different months", () => {
        const result = formatCustomerData(diffCustomerDiffMonth.transactions);

        expect(result).toEqual(diffCustomerDiffMonth.expectedOutput);
    })
});