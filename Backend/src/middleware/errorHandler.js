


export const handleError500 = (res, error, message) => {
    console.error(`${message}:`, error);
    res.status(500).json({
        success: false,
        message,
        error: error.message
    });
};


export const handleError404 = (res, message) => {
    console.error(`${message}:`);
    res.status(404).json({
        success: false,
        message,
    });
};




