export function formatEpochDate(epochDate) {
  const isMilliseconds = epochDate.toString().length === 13;
  const date = new Date(isMilliseconds ? epochDate : epochDate * 1000);
  const dayOfWeek = date.toLocaleDateString(undefined, { weekday: "long" });
  const day = date.toLocaleDateString(undefined, { day: "numeric" });
  const month = date.toLocaleDateString(undefined, { month: "long" });
  const year = date.toLocaleDateString(undefined, { year: "numeric" });
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const time = `${hours}:${minutes}`;
  const today = new Date();

  const isToday =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  let hours12 = date.getHours() % 12 || 12; // Convert 24-hour to 12-hour format, handles 0 as 12
  const ampm = date.getHours() >= 12 ? "PM" : "AM";
  hours12 = hours12.toString().padStart(2, "0"); // Ensures two digits
  const time12 = `${hours12}:${minutes} ${ampm}`;

  return { dayOfWeek, day, month, year, time, time12, isToday };
}

export function fahrenheitToCelsius(fahrenheit) {
  return Math.round(((fahrenheit - 32) * 5) / 9);
}

export function capitalizeEachWord(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
