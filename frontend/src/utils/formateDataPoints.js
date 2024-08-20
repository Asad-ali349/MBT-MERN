const formateDataPoints =(data)=>{
    

    let open = data.map((item)=>{
        return {
            label: item.datetime,
            y: parseFloat(item.open)
        }
    })
    let close = data.map((item)=>{
        return {
            label: item.datetime,
            y:parseFloat(item.close)
        }
    })
    let high = data.map((item)=>{
        return {
            label: item.datetime,
            y:parseFloat(item.high)
        }
    })
    let low = data.map((item)=>{
        return {
            label: item.datetime,
            y:parseFloat(item.low)
        }
    })
    let volumne = data.map((item)=>{
        return {
            label: item.datetime,
            y: parseFloat(item.volume)
        }
    })

        console.log({open,close,high,low,volumne})
    return {open,close,high,low,volumne};


}


export default formateDataPoints;