
export const validateExpense = (req, res, next) => {
    const { amount, description, category, date, paymentMethod } = req.body;
    let errors = [];

    // Check availability and validity for Creation (POST)
    if (req.method === 'POST') {
        if (!amount) errors.push("Amount is required");
        if (!description) errors.push("Description is required");
        if (!category) errors.push("Category is required");
        if (!date) errors.push("Date is required");
        // paymentMethod check based on controller logic which requires it
        if (!paymentMethod) errors.push("Payment Method is required");
    }

    // Validate if present (for both POST and PUT)
    if (amount !== undefined) {
        if (isNaN(amount)) errors.push("Amount must be a number");
        else if (Number(amount) < 0.01) errors.push("Amount must be at least 0.01");
    }

    if (description !== undefined) {
        if (typeof description !== 'string') errors.push("Description must be a string");
        else if (description.trim().length === 0) errors.push("Description cannot be empty");
        else if (description.length > 200) errors.push("Description cannot exceed 200 characters");
    }

    if (category !== undefined) {
        if (typeof category !== 'string' || category.trim().length === 0) {
            errors.push("Category must be a non-empty string");
        }
    }

    if (date !== undefined) {
        if (isNaN(Date.parse(date))) errors.push("Invalid Date format");
    }

    const validPaymentMethods = ['cash', 'credit_card', 'debit_card', 'upi', 'other'];
    if (paymentMethod !== undefined) {
        if (!validPaymentMethods.includes(paymentMethod)) {
            errors.push(`Invalid payment method. Allowed: ${validPaymentMethods.join(', ')}`);
        }
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: "Validation Error",
            errors
        });
    }

    next();
};
