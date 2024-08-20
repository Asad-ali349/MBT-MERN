export const tableColumns = [
    
    {
        name: 'Item Name',
        selector: row => row['Name'],
        sortable: true,
        center: false,
    },
    {
        name: 'Unit Price',
        selector: row => row['Price'],
        sortable: false,
        center: true,
    },
    {
        name: 'Quantity',
        selector: row => row['Quantity'],
        sortable: false,
        center: true,
    },
    {
        name: 'Total Price',
        selector: row => row['TotalPrice'],
        sortable: false,
        center: true,
    },
    {
        name: 'Actions',
        selector: row => row['Action'],
        sortable: false,
        center: true,
    }
];