 const todaysPickUtils=(todaysPick)=>{
    let fav=[];
    for(const stock of todaysPick){
        fav.push(stock.meta.symbol);
    }
    return fav;
}

export default todaysPickUtils;