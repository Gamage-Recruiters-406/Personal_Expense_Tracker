
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



export const validateCategory = (req, res, next) => {
    const { name } = req.body;
    let errors = [];

    // Check Required fields for Creation
    if (req.method === 'POST') {
        if (!name) errors.push("Category name is required");
    }

    // Validate Data Types
    if (name !== undefined) {
        if (typeof name !== 'string' || name.trim().length === 0) {
            errors.push("Category name must be a non-empty string");
        } else if (name.length > 50) {
            errors.push("Category name cannot exceed 50 characters");
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

export const validateAnalytics = (req, res, next) => {
    const { startDate, endDate } = req.query;
    let errors = [];

    // Check if dates are valid dates
    if (startDate && isNaN(Date.parse(startDate))) {
        errors.push("Invalid startDate format. Use YYYY-MM-DD");
    }

    if (endDate && isNaN(Date.parse(endDate))) {
        errors.push("Invalid endDate format. Use YYYY-MM-DD");
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