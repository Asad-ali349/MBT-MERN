export const tableColumns = [
    
    {
        name: 'Product Name',
        selector: row => row['productName'],
        sortable: true,
        center: false,
    },
    
    {
        name: 'Quantity',
        selector: row => row['quantity'],
        sortable: false,
        center: true,
    },
    {
        name: 'Revenue',
        selector: row => row['revenue'],
        sortable: false,
        center: true,
    },
];