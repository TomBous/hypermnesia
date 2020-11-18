

function getLocalTimestamp() {
    const currentDate = new Date();
    return (currentDate.getTime() / 1000) - (currentDate.getTimezoneOffset() * 60);
}

export default getLocalTimestamp;