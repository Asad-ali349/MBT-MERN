const formateMonthlyDataPoints =(data)=>{
    
    let sale = data.map((item)=>{
        return {
            label: item.month,
            y: parseFloat(item.totalSales)
        }
    })
    let orders = data.map((item)=>{
        return {
            label: item.month,
            y:parseFloat(item.totalOrders)
        }
    })
    return [{name:'Sales',data:sale},{name:'Orders',data:orders}];


}

export default formateMonthlyDataPoints;