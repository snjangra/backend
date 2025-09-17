// config/dateTime.js

// Utility to get current Indian Date and Time
export function getIndianDateTime() {
    const now = new Date();
  
    // Format Date -> YYYY-MM-DD
    const dateParts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).formatToParts(now);
  
    const date = `${dateParts.find(p => p.type === "year").value}-${dateParts.find(p => p.type === "month").value}-${dateParts.find(p => p.type === "day").value}`;
  
    // Format Time -> HH:MM:SS (24hr)
    const time = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(now);
  
    return { date, time };
  }
  