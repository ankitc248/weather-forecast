import { weatherIconPairs } from "../../dummyData";

// Shuffle function to randomize the order of the icons
function shuffleArray(array) {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

const uniqueWeatherIcons = getUniqueIcons(weatherIconPairs);
const shuffledIcons1 = shuffleArray(uniqueWeatherIcons);
const shuffledIcons2 = shuffleArray(uniqueWeatherIcons);
const shuffledIcons3 = shuffleArray(uniqueWeatherIcons);

export default function IconBackground({ className = "" }) {
  // Shuffle icons for each section

  return (
    <div
      className={`h-dvh w-dvw fixed grid grid-cols-6 grid-rows-12 lg:grid-cols-12 lg:grid-rows-6 items-center justify-center -z-10 top-0 left-0 ${className}`}
    >
      {shuffledIcons1.map((Icon, index) => (
        <Icon
          key={index}
          className="place-self-center w-10 h-10 opacity-10 animate-spin"
          style={{ animationDuration: "30s", animationDelay: `-${index * 1}s` }}
        />
      ))}
      {shuffledIcons2.map((Icon, index) => (
        <Icon
          key={index}
          className="place-self-center w-10 h-10 opacity-10 animate-spin"
          style={{ animationDuration: "30s", animationDelay: `-${index + 1}s` }}
        />
      ))}
      {shuffledIcons3.map((Icon, index) => (
        <Icon
          key={index}
          className="place-self-center w-10 h-10 opacity-10 animate-spin"
          style={{ animationDuration: "30s", animationDelay: `-${index * 2}s` }}
        />
      ))}
    </div>
  );
}

// Function to get unique icons from weatherIconPairs
function getUniqueIcons(weatherIconPairs) {
  const allIcons = [];

  // Iterate through the 'day' section
  Object.values(weatherIconPairs.day).forEach((iconsArray) => {
    allIcons.push(...iconsArray);
  });

  // Iterate through the 'night' section
  Object.values(weatherIconPairs.night).forEach((iconsArray) => {
    allIcons.push(...iconsArray);
  });

  // Use Set to filter out duplicates and return unique icons
  const uniqueIcons = [...new Set(allIcons)];

  return uniqueIcons;
}
