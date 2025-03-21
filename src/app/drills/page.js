import React from 'react';
import DrillCard from '@/components/DrillCard';

const drills = [
  { title: 'Forehand Rally', description: 'Practice cross-court forehands.', difficulty: 'Intermediate' },
  { title: 'Backhand Slice', description: 'Improve your backhand slice technique.', difficulty: 'Advanced' },
  { title: 'Serve Practice', description: 'Work on your serve consistency and placement.', difficulty: 'Beginner' },
];

const DrillsPage = () => {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl font-bold mb-6">Tennis Drills</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {drills.map((drill, index) => (
          <DrillCard key={index} {...drill} />
        ))}
      </div>
    </div>
  );
};

export default DrillsPage;
