'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Circle, Heart } from 'lucide-react';
import { format, addMonths, subMonths, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, isToday } from 'date-fns';
import { CalendarViewProps } from '../lib/types';
import { generateCalendarDays } from '../lib/utils';

export function CalendarView({ entries, symptoms, onDateSelect, selectedDate }: CalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const calendarDays = generateCalendarDays(currentMonth, entries, symptoms);
  
  // Generate calendar grid (including days from previous/next month for complete weeks)
  const monthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const monthEnd = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  const allDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const getDayInfo = (date: Date) => {
    return calendarDays.find(day => isSameDay(day.date, date));
  };

  const getDayClasses = (date: Date) => {
    const dayInfo = getDayInfo(date);
    const isCurrentMonth = isSameMonth(date, currentMonth);
    const isSelected = selectedDate && isSameDay(date, selectedDate);
    const isTodayDate = isToday(date);

    let classes = 'relative w-10 h-10 flex items-center justify-center text-sm rounded-full transition-all duration-200 cursor-pointer ';

    if (!isCurrentMonth) {
      classes += 'text-gray-300 ';
    } else if (isSelected) {
      classes += 'bg-primary text-white ';
    } else if (isTodayDate) {
      classes += 'bg-accent text-white ';
    } else if (dayInfo?.isPeriod) {
      classes += 'bg-red-100 text-red-700 ';
    } else if (dayInfo?.isFertile) {
      classes += 'bg-green-100 text-green-700 ';
    } else {
      classes += 'hover:bg-gray-100 ';
    }

    return classes;
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="card">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-lg">
        <h2 className="text-heading">{format(currentMonth, 'MMMM yyyy')}</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors duration-200"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors duration-200"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 mb-4">
        {/* Week day headers */}
        {weekDays.map(day => (
          <div key={day} className="text-center text-caption font-medium py-2">
            {day}
          </div>
        ))}

        {/* Calendar days */}
        {allDays.map(date => {
          const dayInfo = getDayInfo(date);
          return (
            <div
              key={date.toISOString()}
              onClick={() => onDateSelect(date)}
              className={getDayClasses(date)}
            >
              <span>{format(date, 'd')}</span>
              
              {/* Indicators */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex gap-0.5">
                {dayInfo?.isPeriod && (
                  <Circle size={4} className="fill-current text-red-500" />
                )}
                {dayInfo?.isFertile && (
                  <Circle size={4} className="fill-current text-green-500" />
                )}
                {dayInfo?.symptoms && (
                  <Heart size={4} className="fill-current text-purple-500" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-caption">
        <div className="flex items-center gap-1">
          <Circle size={8} className="fill-current text-red-500" />
          <span>Period</span>
        </div>
        <div className="flex items-center gap-1">
          <Circle size={8} className="fill-current text-green-500" />
          <span>Fertile</span>
        </div>
        <div className="flex items-center gap-1">
          <Heart size={8} className="fill-current text-purple-500" />
          <span>Symptoms</span>
        </div>
        <div className="flex items-center gap-1">
          <Circle size={8} className="fill-current text-accent" />
          <span>Today</span>
        </div>
      </div>

      {/* Selected Date Info */}
      {selectedDate && (
        <div className="mt-md p-sm bg-gray-50 rounded-md">
          <h3 className="font-medium text-sm mb-2">{format(selectedDate, 'EEEE, MMMM d')}</h3>
          {(() => {
            const dayInfo = getDayInfo(selectedDate);
            if (!dayInfo) return <p className="text-caption">No data for this date</p>;
            
            return (
              <div className="space-y-1 text-caption">
                {dayInfo.isPeriod && <p>🔴 Period day</p>}
                {dayInfo.isFertile && <p>🟢 Fertile window</p>}
                {dayInfo.symptoms && (
                  <p>💜 Symptoms: {dayInfo.symptoms.mood}, {dayInfo.symptoms.energy} energy</p>
                )}
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
