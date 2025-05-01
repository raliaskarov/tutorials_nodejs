 // Export a function named 'getDate' from the module
module.exports.getDate = function getDate() {
    // Get the current date and time in the timezone "Australia/Brisbane"
    let aestTime = new Date().toLocaleString("en-US", {timeZone: "Australia/Brisbane"});
    return aestTime; // Return the formatted date and time
};

// more complete function with hours
module.exports.getDateInfo = function getDateInfo() {
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Australia/Brisbane',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    });

    const parts = formatter.formatToParts(new Date());
    const dateObj = Object.fromEntries(parts.map(p => [p.type, p.value]));

    return {
        dateString: `${dateObj.month}/${dateObj.day}/${dateObj.year}, ${dateObj.hour}:${dateObj.minute}:${dateObj.second}`,
        hour: parseInt(dateObj.hour),
    };
};
