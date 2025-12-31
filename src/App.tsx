import { useEffect, useState } from 'react';
import './App.css'

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const currentDay = getDayOfYear(currentTime);
  const daysCompleted = currentDay - 1;
  const daysLeft = 365 - daysCompleted; 

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  

  return (
   <main className='main'>
    <h1>{currentTime.getFullYear()}</h1>
    <div className="dots">
    {[...Array(365)].map((_, index) => {
        const dayNumber = index + 1;
        const isPast = dayNumber < currentDay; 
        const isToday = dayNumber === currentDay;
        const date = getDateFromDayOfYear(dayNumber, currentTime.getFullYear());

        return (
          <div 
            key={index}
            title={date.toLocaleDateString('en-US', { 
              month: 'long', 
              day: 'numeric',
              year: 'numeric'
            })}
            className={`dot ${isPast ? 'past' : ''} ${isToday ? 'today' : ''}`}
          />
        );
      })}
    </div>
    <h2>{daysLeft} days left • {Math.floor((daysCompleted / 365) * 100)}% completed</h2>
   </main>
  )
}

function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
} 

function getDateFromDayOfYear(dayOfYear: number, year: number): Date {
  const date = new Date(year, 0);
  date.setDate(dayOfYear);
  return date;
}

export default App