import categories from "../models/categories.js";
import Order from "../models/orders.js";
import products from "../models/products.js";

// Utility function to get the start and end of the current month
function getCurrentMonthDateRange() {
    const now = new Date();
    
    // Calculate start of the month based on custom time
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1, 16, 0, 0, 0); // 4 PM on the 1st of the month

    // Calculate end of the month based on custom time
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1, 6, 0, 0, 0); // 6 AM on the 1st of the next month

    return { startOfMonth, endOfMonth };
}

function getCurrentYearDateRange() {
    const now = new Date();

    // Start of the year (January 1st) at 4 PM
    const startOfYear = new Date(now.getFullYear(), 0, 1, 16, 0, 0, 0);

    // End of today (current date) at 4 AM of the next day
    const endOfYear = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 6, 0, 0, 0);

    // If current time is before 6 PM, set end of today to 4 AM of the current day
    if (now.getHours() < 6) {
        endOfYear.setDate(endOfYear.getDate() - 1);
    }

    return { startOfYear, endOfYear };
}

function getTodayDateRange() {
    const now = new Date();
    
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 16, 0, 0, 0); // 4 PM today
    const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 6, 0, 0, 0); // 6 AM tomorrow

    // If current time is before 4 PM, adjust to the previous day
    if (now.getHours() < 6) {
        startOfToday.setDate(startOfToday.getDate() - 1);
        endOfToday.setDate(endOfToday.getDate() - 1);
    }

    return { startOfToday, endOfToday };
}

export const GetDashbaordDetail = async (req, res) => {
    try {
        const { startOfToday, endOfToday } = getTodayDateRange();
        const totalSalesTodayResult = await Order.aggregate([
            { $match: { createdAt: { $gte: startOfToday, $lte: endOfToday } } },
            { $group: { _id: null, totalSales: { $sum: "$grandTotal" } } },
        ]);

        const totalSalesToday=totalSalesTodayResult.length > 0 ? totalSalesTodayResult[0].totalSales : 0;

        // today's discount 
        const totalDiscountTodayResult = await Order.aggregate([
            { $match: { createdAt: { $gte: startOfToday, $lte: endOfToday } } },
            { $group: { _id: null, totalDiscount: { $sum: "$discount" } } },
        ]);

        const totalDiscountToday=totalDiscountTodayResult.length > 0 ? totalDiscountTodayResult[0].totalDiscount : 0;


        // today's discount order count 
        const totalDiscountOrderTodayResult = await Order.countDocuments({
            createdAt: { $gte: startOfToday, $lte: endOfToday },
            orderType: "onsite",
            discount:{$gte:1}
        });

        // today's discount order count 
        const totalPendingOrderToday = await Order.countDocuments({
            createdAt: { $gte: startOfToday, $lte: endOfToday },
            status:"pending"
        });

        // Get the date range for the current month
        const { startOfMonth, endOfMonth } = getCurrentMonthDateRange();

        // Query to get the total number of orders this month
      

        // Query to get total sales this month (grandTotal sum)
        const totalSalesResult = await Order.aggregate([
            { $match: { createdAt: { $gte: startOfMonth, $lte: endOfMonth } } },
            { $group: { _id: null, totalSales: { $sum: "$grandTotal" } } },
        ]);
        const totalSalesThisMonth =
            totalSalesResult.length > 0 ? totalSalesResult[0].totalSales : 0;

        // Query to get number of onsite orders this month
        const onsiteOrdersToday = await Order.countDocuments({
            createdAt: { $gte: startOfToday, $lte: endOfToday },
            orderType: "onsite",
        });

        // Query to get number of online orders this month
        const onlineOrdersToday = await Order.countDocuments({
            createdAt: { $gte: startOfToday, $lte: endOfToday },
            orderType: "online",
        });

        const totalProducts = await products.countDocuments();
        const totalCategories = await categories.countDocuments();

        // Get the date range for the current year till today
        const { startOfYear, endOfYear } = getCurrentYearDateRange();

        // Aggregation pipeline to get monthly sales
        const monthlySales = await Order.aggregate([
            { $match: { createdAt: { $gte: startOfYear, $lte: endOfYear } } },
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" },
                    },
                    totalSales: { $sum: "$grandTotal" },
                    totalOrders: { $sum: 1 },
                },
            },
            { $sort: { "_id.year": 1, "_id.month": 1 } },
        ]);
        
        const currentMonth = new Date().getMonth() + 1;
        
        // Prepare an array of all months of the current year
        const allMonths = Array.from({ length: currentMonth }, (_, i) => {
            return {
                month: new Date(new Date().getFullYear(), i).toLocaleString("default", {
                    month: "long",
                }),
                totalSales: 0,
                totalOrders: 0,
            };
        });

        // Map the aggregated sales data to the allMonths array
        monthlySales.forEach((item) => {
            const monthIndex = item._id.month - 1; // month is 1-based in MongoDB
            allMonths[monthIndex].totalSales = item.totalSales;
            allMonths[monthIndex].totalOrders = item.totalOrders;
        });

        // Get the current year
        const currentYear = new Date().getFullYear();

        // Aggregation pipeline to get yearly sales
        const yearlySalesQuery = await Order.aggregate([
            { $match: { createdAt: { $exists: true } } }, // Match from the earliest date to now
            {
                $group: {
                    _id: { year: { $year: "$createdAt" } },
                    totalSales: { $sum: "$grandTotal" },
                    totalOrders: { $sum: 1 }
                }
            },
            { $sort: { "_id.year": 1 } }
        ]);

        const yearlySales = yearlySalesQuery.map((sale) => ({
            year: sale._id.year,
            totalSales: sale.totalSales,
            totalOrders: sale.totalOrders,
        }));

        // Return the statistics
        res.status(200).json({
            totalSalesToday,
            totalDiscountToday,
            totalDiscountOrderTodayResult,
            totalPendingOrderToday,
            totalSalesThisMonth,
            onsiteOrdersToday,
            onlineOrdersToday,
            totalProducts,
            totalCategories,
            monthlySales: allMonths,
            yearlySales: yearlySales
        });
    } catch (error) {
        console.log("Error:", error);
        res.status(505).json({ message: error.message });
    }
};
