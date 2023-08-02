function rotateClockHands() {
  const currentTime = new Date();
  let hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();

  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours %= 12;
  hours = hours || 12;

  const hourHand = document.getElementById('hour-hand');
  const minuteHand = document.getElementById('minute-hand');
  const secondHand = document.getElementById('second-hand');

  // Calculate degrees for each clock hand
  const hourDegree = (hours * 30) + (0.5 * minutes);
  const minuteDegree = (minutes * 6) + (0.1 * seconds);
  const secondDegree = seconds * 6;

  // Apply rotation to clock hands
  hourHand.style.transform = `translateY(-100%) rotate(${hourDegree}deg)`;
  minuteHand.style.transform = `translateY(-100%) rotate(${minuteDegree}deg)`;
  secondHand.style.transform = `translateY(-100%) rotate(${secondDegree}deg)`;

  // Update the digital clock
  const digitalClock = document.getElementById('digital-clock');
  digitalClock.textContent = formatTime(hours, minutes, seconds, ampm);
}

function formatTime(hours, minutes, seconds, ampm) {
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');
  return `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${ampm}`;
}

// Update the clock hands and digital clock every second
setInterval(rotateClockHands, 1000);

// Initial call to avoid delay in rendering the clock
rotateClockHands();