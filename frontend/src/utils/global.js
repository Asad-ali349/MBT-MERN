export const formateDate=(dateStr)=>{
    const date = new Date(dateStr);

    // Format the date to '13 Sep 2024'
    const formattedDate = date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    });
    return formattedDate
}

export const formateDateUTCZOne = (dateStr) => {
    const date = new Date(dateStr);
    const options = { year: "numeric", month: "short", day: "2-digit", timeZone: "UTC" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
};

export const formatTime = (dateStr) => {
    const date = new Date(dateStr);

    // Format the time to '3:00 pm'
    const formattedTime = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    });

    return formattedTime;
};