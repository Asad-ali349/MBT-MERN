export const SoldProducts = [
    
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


export const purchaseProducts = [
    {
        name: 'Product Name',
        selector: row => row['Name'],
        sortable: true,
        center: false,
    },
    {
        name: 'Quantity',
        selector: row => row['Quantity'],
        sortable: false,
        center: true,
    },
    {
        name: 'Unit',
        selector: row => row['Unit'],
        sortable: false,
        center: true,
    },
    {
        name: 'Price',
        selector: row => row['Price'],
        sortable: false,
        center: true,
    },
    {
        name: 'Purchased Date',
        selector: row => row['Date'],
        sortable: false,
        center: true,
    },
];