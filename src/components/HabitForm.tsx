
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusCircle, X, Sparkles } from 'lucide-react';
import { Habit } from '@/utils/habitUtils';
import { toast } from 'sonner';

interface HabitFormProps {
  onAddHabit: (habit: Habit) => void;
}

const HabitForm: React.FC<HabitFormProps> = ({ onAddHabit }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [habitName, setHabitName] = useState('');
  const [habitDescription, setHabitDescription] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!habitName.trim()) {
      toast.error('Please enter a habit name');
      return;
    }
    
    const newHabit: Habit = {
      id: Date.now().toString(),
      name: habitName.trim(),
      description: habitDescription.trim(),
      createdAt: new Date(),
      color: getRandomColor(),
    };
    
    onAddHabit(newHabit);
    toast.success(`New habit "${habitName}" added!`);
    
    // Reset form
    setHabitName('');
    setHabitDescription('');
    setIsFormOpen(false);
  };
  
  const getRandomColor = () => {
    const colors = ['#4f46e5', '#0ea5e9', '#059669', '#d946ef', '#f59e0b', '#ec4899'];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  
  if (!isFormOpen) {
    return (
      <Button 
        onClick={() => setIsFormOpen(true)}
        variant="outline" 
        className="w-full flex items-center justify-center gap-2 py-6 border border-dashed border-blue-200 text-blue-600 hover:text-blue-700 hover:border-blue-300 bg-white/70 hover:bg-white/90 transition-all duration-300 group backdrop-blur-sm shadow-sm hover:shadow"
      >
        <PlusCircle className="h-5 w-5 transition-transform group-hover:scale-110 duration-300" />
        <span className="font-medium">Add New Habit</span>
      </Button>
    );
  }
  
  return (
    <div className="p-5 rounded-xl border border-white/40 bg-white/90 backdrop-blur-sm shadow-md scale-in">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-blue-500" />
          New Habit
        </h3>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsFormOpen(false)}
          className="h-8 w-8 text-gray-500 hover:text-gray-700 hover:bg-gray-100/50"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="habit-name" className="text-sm font-medium text-gray-700">
            Habit Name
          </label>
          <Input
            id="habit-name"
            placeholder="e.g., Exercise, Read, Meditate"
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
            className="w-full border-gray-200 focus:border-blue-300 bg-white/80 backdrop-blur-sm"
            autoFocus
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="habit-description" className="text-sm font-medium text-gray-700">
            Description (optional)
          </label>
          <Input
            id="habit-description"
            placeholder="e.g., Walk for 30 minutes"
            value={habitDescription}
            onChange={(e) => setHabitDescription(e.target.value)}
            className="w-full border-gray-200 focus:border-blue-300 bg-white/80 backdrop-blur-sm"
          />
        </div>
        
        <div className="flex justify-end gap-3 pt-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => setIsFormOpen(false)}
            className="border-gray-200 text-gray-600"
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            className="bg-gradient-to-tr from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-md hover:shadow-lg transition-all duration-300"
          >
            Add Habit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default HabitForm;
