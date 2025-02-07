export const tableColumns = [
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
    {
        name: 'Actions',
        selector: row => row['Action'],
        sortable: false,
        center: true,
    }
];