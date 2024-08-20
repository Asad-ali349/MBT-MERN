export const tableColumns = [
    
    {
        name: 'Name',
        selector: row => row['Name'],
        sortable: true,
        center: false,
    },
    {
        name: 'Image',
        selector: row => row['Image'],
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