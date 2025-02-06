export const calculateTime = (dateString) => {
    // Assuming input date is in UTC
    const inputDate = new Date(dateString);

    // Check if the inputDate is valid 
    if (isNaN(inputDate.getTime())) { return 'Invalid date'; }

    // Get current date
    const currDate = new Date();
    const timeDifference = currDate - inputDate;
    const seconds = Math.floor(timeDifference / 1000); 
    const minutes = Math.floor(seconds / 60);

    if (timeDifference < 60000) { 
        // Less than 1 minute 
        return 'Just now'; 
    } else if (minutes < 60) { 
        return `${minutes} mins ago`; 
    } else if (minutes < 1440) { // Less than 24 hours 
        const hours = Math.floor(minutes / 60); 
        return `${hours} ${hours === 1? "hr" : 'hrs'}`; 
    } else if (minutes < 10080) { // Less than 7 days 
        const days = Math.floor(minutes / 1440); 
        return `${days} ${days === 1? "dy" : 'dys'}`; 
    } else if (minutes < 525600) { // Less than 1 year 
        const weeks = Math.floor(minutes / 10080); 
        return `${weeks} ${weeks === 1? "wk" : 'wks'}`; 
    } else if (minutes < 31536000) { // Less than 10 years 
        const months = Math.floor(minutes / 43200); 
        return `${months} months ago`; 
    } else { 
        const years = Math.floor(minutes / 525600); 
        return `${years} years ago`; 
    }

};