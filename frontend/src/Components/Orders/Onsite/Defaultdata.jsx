export const tableColumns = [
    
    {
        name: 'Order Number',
        selector: row => row['orderNumber'],
        sortable: true,
        center: false,
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
        name: 'Order Date',
        selector: row => row['orderDate'],
        sortable: false,
        center: true,
    },
    {
        name: 'Order Time',
        selector: row => row['orderTime'],
        sortable: false,
        center: true,
    },
    {
        name: 'Order Status',
        selector: row => row['orderStatus'],
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