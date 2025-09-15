'use client';

import { useState } from 'react';
import { Calendar } from 'lucide-react';
import { CycleInputFormProps } from '../lib/types';
import { validateCycleEntry } from '../lib/utils';

export function CycleInputForm({ onSubmit, isLoading = false }: CycleInputFormProps) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!startDate) {
      setError('Please enter your period start date');
      return;
    }

    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : undefined;

    const validationError = validateCycleEntry(start, end);
    if (validationError) {
      setError(validationError);
      return;
    }

    onSubmit(start, end);
    
    // Reset form
    setStartDate('');
    setEndDate('');
  };

  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-md">
        <Calendar className="text-primary" size={20} />
        <h2 className="text-heading">Log Your Cycle</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-md">
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-text mb-2">
            Period Start Date *
          </label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="input"
            max={new Date().toISOString().split('T')[0]}
            required
          />
        </div>

        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-text mb-2">
            Period End Date (optional)
          </label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="input"
            min={startDate}
            max={new Date().toISOString().split('T')[0]}
          />
          <p className="text-caption mt-1">
            Leave empty if your period is still ongoing
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-sm">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Saving...' : 'Log Cycle'}
        </button>
      </form>

      <div className="mt-md p-sm bg-accent/10 rounded-md">
        <p className="text-caption">
          💡 <strong>Tip:</strong> Regular logging helps improve cycle predictions and symptom correlations.
        </p>
      </div>
    </div>
  );
}
