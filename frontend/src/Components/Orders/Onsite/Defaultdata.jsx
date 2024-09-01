export const tableColumns = [
    
    {
        name: 'Order Number',
        selector: row => row['orderNumber'],
        sortable: true,
        center: false,
    },
    {
        name: 'Order Type',
        selector: row => row['orderType'],
        sortable: false,
        center: true,
    },
    {
        name: 'Payment Method',
        selector: row => row['paymentMethod'],
        sortable: false,
        center: true,
    },
    {
        name: 'Total Price',
        selector: row => row['grandTotal'],
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