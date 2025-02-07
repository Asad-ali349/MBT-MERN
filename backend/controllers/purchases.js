import Purchase from '../models/purchases.js';

// Create a new purchase
export const CreatePurchase = async (req, res) => {
    const purchaseDetails = req.body;
    try {
        const newPurchase = new Purchase(purchaseDetails);
        const purchaseCreated = await newPurchase.save();
        if (!purchaseCreated) {
            throw new Error("Unable to Create Purchase");
        }
        res.status(200).json({ message: "Purchase Created Successfully", purchase: purchaseCreated });
    } catch (error) {
        console.error('Error creating purchase:', error);
        return res.status(500).json({ message: error.message });
    }
};

export const GetAllPurchases = async (req, res) => {
    const date = req.query.date;  // Expecting format: YYYY-MM-DD
    
    try {
        let startDateUTC, endDateUTC;

        if (date) {
            // Convert the provided date to UTC
            const localDate = new Date(date + "T00:00:00");  // Assume midnight local time
            startDateUTC = new Date(Date.UTC(localDate.getFullYear(), localDate.getMonth(), localDate.getDate()-1, 19, 0, 0));
            endDateUTC = new Date(Date.UTC(localDate.getFullYear(), localDate.getMonth(), localDate.getDate() , 18, 59, 0));
        } else {
            // Use current date in UTC
            const now = new Date();
            startDateUTC = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()-1, 19, 0, 0));
            endDateUTC = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), 18, 59, 0));
        }

        // console.log("Start UTC:", startDateUTC.toISOString()); // Debugging
        // console.log("End UTC:", endDateUTC.toISOString()); // Debugging

        // Query MongoDB with UTC time range
        const purchases = await Purchase.find({ 
            createdAt: { $gte: startDateUTC, $lt: endDateUTC } 
        }).populate('product');

        if (!purchases.length) {
            return res.status(404).json({ message: "No Purchases Found" });
        }

        res.status(200).json(purchases);
    } catch (error) {
        console.error('Error fetching purchases:', error);
        return res.status(500).json({ message: error.message });
    }
};



// Get a single purchase by ID
export const GetSinglePurchase = async (req, res) => {
    const { purchaseId } = req.params;
    try {
        const purchase = await Purchase.findById(purchaseId);
        if (!purchase) {
            return res.status(404).json({ message: "No Purchase Found" });
        }
        res.status(200).json(purchase);
    } catch (error) {
        console.error('Error fetching purchase:', error);
        return res.status(500).json({ message: error.message });
    }
};

// Update a purchase by ID
export const UpdatePurchase = async (req, res) => {
    const { purchaseId } = req.params;
    const purchaseDetails = req.body;
    try {
        const updatedPurchase = await Purchase.findByIdAndUpdate(purchaseId, purchaseDetails, { new: true });
        if (!updatedPurchase) {
            return res.status(404).json({ message: "Purchase not found with given ID" });
        }
        res.status(200).json({ message: "Purchase Updated Successfully", purchase: updatedPurchase });
    } catch (error) {
        console.error('Error updating purchase:', error);
        return res.status(500).json({ message: error.message });
    }
};

// Delete a purchase by ID
export const DeletePurchase = async (req, res) => {
    const { purchaseId } = req.params;
    try {
        const deletedPurchase = await Purchase.findByIdAndDelete(purchaseId);
        if (!deletedPurchase) {
            return res.status(404).json({ message: "Purchase not found with given ID" });
        }
        res.status(200).json({ message: "Purchase Deleted Successfully", purchase: deletedPurchase });
    } catch (error) {
        console.error('Error deleting purchase:', error);
        return res.status(500).json({ message: error.message });
    }
}; 