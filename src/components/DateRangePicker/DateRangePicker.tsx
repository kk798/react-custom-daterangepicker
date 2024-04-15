import React, { useState } from 'react';
import './DateRangePicker.css';

const DateRangePicker: React.FC = () => {
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  const isWeekend = (date: string): boolean => {
    const dayOfWeek = new Date(date).getDay();
    return dayOfWeek === 0 || dayOfWeek === 6;
  };

  const getFormattedDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getWeekendDaysBetweenDates = (startDate: string, endDate: string): string[] => {
    const weekendDays: string[] = [];
    let currentDate = new Date(startDate);
    const finalEndDate = new Date(endDate);
    while (currentDate <= finalEndDate) {
      const dayOfWeek = currentDate.getDay();
      if (dayOfWeek === 6 || dayOfWeek === 0) {
        weekendDays.push(getFormattedDate(currentDate));
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return weekendDays;
  };

  const getResult = (startDate: string | null, currentEndDate: string | null): void => {
    let weekendDays: string[] = [];
    if (startDate && currentEndDate && !isWeekend(currentEndDate)) {
      weekendDays = getWeekendDaysBetweenDates(startDate, currentEndDate);
    }
    console.log('Result--', [[startDate, !isWeekend(currentEndDate || '') ? currentEndDate : null], weekendDays]);
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const date = e.target.value;
    if (isWeekend(date)) {
      alert('It\'s a Weekend!!!');
      setStartDate(null);
    } else {
      setStartDate(date);
    }
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const currentEndDate = e.target.value;
    if (isWeekend(currentEndDate)) {
      alert('It\'s a Weekend!!!');
      setEndDate(null);
    } else {
      setEndDate(currentEndDate);
      getResult(startDate, currentEndDate);
    }
  };

  const getLastDaysRange = (days: number): { startDate: string; endDate: string } => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - (days - 1));
    return {
      startDate: getFormattedDate(startDate),
      endDate: getFormattedDate(endDate),
    };
  };

  const handleLastDaysClick = (e: React.MouseEvent<HTMLButtonElement>, days: number): void => {
    e.preventDefault();
    const { startDate, endDate } = getLastDaysRange(days);
    setStartDate(startDate);
    setEndDate(endDate);
    getResult(startDate, endDate);
  };

  const handleClear = (): void => {
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <form className="date-range-picker">
      <div className="date-inputs">
        <label>
          Start Date:
          <input type="date" value={startDate || ''} onChange={handleStartDateChange} pattern="\d{4}-\d{2}-\d{2}" />
        </label>
        <label>
          End Date:
          <input type="date" value={endDate || ''} onChange={handleEndDateChange} pattern="\d{4}-\d{2}-\d{2}" />
        </label>
      </div>
      <div className="buttons">
        <button onClick={(e) => handleLastDaysClick(e, 7)}>Last 7 Days</button>
        <button onClick={(e) => handleLastDaysClick(e, 30)}>Last 30 Days</button>
        <button onClick={handleClear}>Clear</button>
      </div>
    </form>
  );
};

export default DateRangePicker;
