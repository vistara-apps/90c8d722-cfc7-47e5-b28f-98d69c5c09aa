import { format, addDays, differenceInDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import { CycleEntry, CalendarDay, CyclePhase } from './types';

// Cycle prediction utilities
export function predictNextCycle(entries: CycleEntry[]): CycleEntry | null {
  if (entries.length === 0) return null;
  
  const sortedEntries = entries.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
  const lastEntry = sortedEntries[0];
  
  // Calculate average cycle length from last 3 cycles
  const avgCycleLength = calculateAverageCycleLength(sortedEntries.slice(0, 3));
  const avgPeriodLength = calculateAveragePeriodLength(sortedEntries.slice(0, 3));
  
  const nextStartDate = addDays(new Date(lastEntry.startDate), avgCycleLength);
  const nextEndDate = addDays(nextStartDate, avgPeriodLength);
  
  return {
    entryId: `predicted-${Date.now()}`,
    userId: lastEntry.userId,
    startDate: nextStartDate,
    endDate: nextEndDate,
    predictedEndDate: nextEndDate,
    cycleLength: avgCycleLength,
    periodLength: avgPeriodLength,
  };
}

export function calculateAverageCycleLength(entries: CycleEntry[]): number {
  if (entries.length < 2) return 28; // Default cycle length
  
  const cycleLengths = [];
  for (let i = 0; i < entries.length - 1; i++) {
    const current = new Date(entries[i].startDate);
    const next = new Date(entries[i + 1].startDate);
    cycleLengths.push(differenceInDays(current, next));
  }
  
  return Math.round(cycleLengths.reduce((sum, length) => sum + length, 0) / cycleLengths.length);
}

export function calculateAveragePeriodLength(entries: CycleEntry[]): number {
  const periodsWithEndDate = entries.filter(entry => entry.endDate);
  if (periodsWithEndDate.length === 0) return 5; // Default period length
  
  const periodLengths = periodsWithEndDate.map(entry => 
    differenceInDays(new Date(entry.endDate!), new Date(entry.startDate)) + 1
  );
  
  return Math.round(periodLengths.reduce((sum, length) => sum + length, 0) / periodLengths.length);
}

// Fertile window calculation (ovulation typically occurs 14 days before next period)
export function calculateFertileWindow(cycleEntry: CycleEntry): { start: Date; end: Date } | null {
  if (!cycleEntry.cycleLength) return null;
  
  const ovulationDay = addDays(new Date(cycleEntry.startDate), cycleEntry.cycleLength - 14);
  const fertileStart = addDays(ovulationDay, -5); // 5 days before ovulation
  const fertileEnd = addDays(ovulationDay, 1); // 1 day after ovulation
  
  return { start: fertileStart, end: fertileEnd };
}

// Calendar generation
export function generateCalendarDays(
  month: Date,
  entries: CycleEntry[],
  symptoms: any[]
): CalendarDay[] {
  const start = startOfMonth(month);
  const end = endOfMonth(month);
  const days = eachDayOfInterval({ start, end });
  
  return days.map(date => {
    const isPeriod = entries.some(entry => {
      const startDate = new Date(entry.startDate);
      const endDate = entry.endDate ? new Date(entry.endDate) : addDays(startDate, 5);
      return date >= startDate && date <= endDate;
    });
    
    const fertileWindows = entries.map(entry => calculateFertileWindow(entry)).filter(Boolean);
    const isFertile = fertileWindows.some(window => 
      window && date >= window.start && date <= window.end
    );
    
    const daySymptoms = symptoms.find(symptom => 
      isSameDay(new Date(symptom.date), date)
    );
    
    return {
      date,
      isPeriod,
      isFertile,
      isPredicted: false, // You can enhance this based on predicted cycles
      symptoms: daySymptoms,
    };
  });
}

// Cycle phase determination
export function getCurrentCyclePhase(date: Date, cycleEntry: CycleEntry): CyclePhase {
  const cycleStart = new Date(cycleEntry.startDate);
  const dayInCycle = differenceInDays(date, cycleStart) + 1;
  const cycleLength = cycleEntry.cycleLength || 28;
  
  if (dayInCycle <= (cycleEntry.periodLength || 5)) {
    return 'menstrual';
  } else if (dayInCycle <= 13) {
    return 'follicular';
  } else if (dayInCycle <= 16) {
    return 'ovulation';
  } else {
    return 'luteal';
  }
}

// Date formatting utilities
export function formatDate(date: Date): string {
  return format(date, 'MMM dd, yyyy');
}

export function formatDateShort(date: Date): string {
  return format(date, 'MMM dd');
}

// Validation utilities
export function validateCycleEntry(startDate: Date, endDate?: Date): string | null {
  if (startDate > new Date()) {
    return 'Start date cannot be in the future';
  }
  
  if (endDate && endDate < startDate) {
    return 'End date cannot be before start date';
  }
  
  if (endDate && differenceInDays(endDate, startDate) > 10) {
    return 'Period length seems unusually long (>10 days)';
  }
  
  return null;
}

// Mock data generators for development
export function generateMockCycleEntries(userId: string, count: number = 3): CycleEntry[] {
  const entries: CycleEntry[] = [];
  let currentDate = new Date();
  
  for (let i = 0; i < count; i++) {
    const startDate = addDays(currentDate, -(28 * (i + 1)));
    const endDate = addDays(startDate, 5);
    
    entries.push({
      entryId: `mock-${i}`,
      userId,
      startDate,
      endDate,
      cycleLength: 28,
      periodLength: 5,
    });
  }
  
  return entries.reverse();
}
