
import HabitDashboard from '@/components/HabitDashboard';
import CuteAnimals from '@/components/CuteAnimals';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex flex-col relative overflow-hidden">
      <CuteAnimals />
      <HabitDashboard />
    </div>
  );
};

export default Index;
