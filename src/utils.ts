export const setQueryStringParameter = (name, value) => {
  const params = new URLSearchParams(window.location.search);
  params.set(name, value);
  window.history.pushState(
    {},
    "",
    decodeURIComponent(`${window.location.pathname}?${params}`)
  );
};

export const sortByMMYYYY = (dates) => {
  return dates.sort((a, b) => {
    const [monthA, yearA] = a.split("-").map(Number);
    const [monthB, yearB] = b.split("-").map(Number);

    if (yearA !== yearB) {
      return yearB - yearA;
    } else {
      return monthB - monthA;
    }
  });
};

export const getMonthName = (monthInStr) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthNumber = Number(monthInStr);
  // Adjust for JavaScript's 0-indexed months
  if (monthNumber >= 1 && monthNumber <= 12) {
    return monthNames[monthNumber - 1];
  } else {
    return "Invalid month number";
  }
};

// mmYYYY is 02-2024
// use for sorting
export const getDateFromMMYYYY = (mmYYYY) => {
  const [month, year] = mmYYYY.split("-").map(Number);

  // JavaScript months are 0-indexed (Jan = 0, Feb = 1, etc.)
  const date = new Date(year, month - 1);

  return date;
};
