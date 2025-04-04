
import { Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const programs = [
  {
    id: 'beginner',
    title: 'Beginner',
    image: '/beginner-chess.jpg',
    description: 'Perfect for those who are new to chess. Learn the fundamentals of the game, piece movements, and basic strategies.',
    features: [
      'Basic piece movements',
      'Simple checkmates',
      'Opening principles'
    ]
  },
  {
    id: 'intermediate-1',
    title: 'Intermediate 1',
    image: '/intermediate1-chess.jpg',
    description: 'Building on fundamentals, this program teaches tactical patterns, planning, and middle game concepts.',
    features: [
      'Basic tactics',
      'Positional concepts',
      'Endgame fundamentals'
    ]
  },
  {
    id: 'intermediate-2',
    title: 'Intermediate 2',
    image: '/intermediate2-chess.jpg',
    description: 'For improving players, focusing on deeper strategic understanding, complex tactics, and specific openings.',
    features: [
      'Advanced tactics',
      'Opening repertoire',
      'Strategic planning'
    ]
  },
  {
    id: 'advanced',
    title: 'Advanced',
    image: '/advanced-chess.jpg',
    description: 'Elite training for serious competitors, covering sophisticated strategies, deep analysis, and tournament preparation.',
    features: [
      'Critical positions',
      'Complex endgames',
      'Tournament preparation'
    ]
  }
];

const ProgramsSection = () => {
  return (
    <section className="py-16 md:py-24 relative bg-chess-navy/50">
      <div className="absolute inset-0 bg-chess-pattern bg-[length:40px_40px] opacity-5"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <span className="px-4 py-1 rounded-full bg-chess-navy text-chess-blue text-sm font-medium">
              Our Programs
            </span>
          </div>
          <h2 className="section-title">Elevate Your Chess Skills</h2>
          <p className="section-subtitle">
            Choose from our carefully crafted programs designed for players of all levels. 
            Learn from the best coaches and join a global community of chess enthusiasts.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((program) => (
            <div key={program.id} className="program-card">
              <div className="mb-4 h-16 flex items-center justify-center">
                <img
                  src={program.image}
                  alt={program.title}
                  className="w-16 h-16 object-cover rounded"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/150?text=Chess';
                  }}
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{program.title}</h3>
              <p className="text-gray-400 mb-6 text-sm">{program.description}</p>
              
              <div className="mb-6">
                {program.features.map((feature, index) => (
                  <div key={index} className="checkmark-item">
                    <Check size={16} className="text-chess-blue min-w-[16px]" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              
              <Link to={`/programs/${program.id}`}>
                <Button variant="secondary" className="w-full justify-between">
                  Learn More
                  <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
