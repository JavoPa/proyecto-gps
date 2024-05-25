/**
 * Checks if two dates occurred on the same day
 * @param {Date} date1 The first date
 * @param {Date} date2 The second date
 * @returns {boolean} True if the dates occurred on the same day, false otherwise
 */
function sameDay(date1, date2) {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
}