export const tableColumns = [
    
    {
        name: 'Product Image',
        selector: row => row['Image'],
        sortable: false,
        center: true,
    },
    {
        name: 'Name',
        selector: row => row['Name'],
        sortable: true,
        center: false,
    },
    {
        name: 'Category',
        selector: row => row['Category'],
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
        name: 'Availibity Status',
        selector: row => row['status'],
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