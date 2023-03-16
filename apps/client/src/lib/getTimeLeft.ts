export const getTimeLeft = (endDate: Date) => {
  const now = new Date();
  const timeLeftMs = endDate.getTime() - now.getTime();

  if (timeLeftMs <= 0) {
    return "0m";
  }

  const minutesLeft = Math.floor(timeLeftMs / (1000 * 60));
  const hoursLeft = Math.floor(minutesLeft / 60);
  const daysLeft = Math.floor(hoursLeft / 24);

  const minutes = minutesLeft % 60;
  const hours = hoursLeft % 24;

  const formattedTimeLeft = [
    daysLeft > 0 ? `${daysLeft}d` : "",
    hoursLeft > 0 ? `${hours}h` : "",
    minutesLeft > 0 ? `${minutes}m` : "",
  ]
    .filter((time) => time !== "")
    .join(" ");

  return formattedTimeLeft;
};
