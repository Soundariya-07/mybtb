
import { Brain, Lightbulb, Heart, Trophy, Users, BarChart3 } from 'lucide-react';

const benefits = [
  {
    icon: Brain,
    title: 'Cognitive Development',
    description: 'Chess enhances problem-solving abilities, critical thinking, and pattern recognition in players of all ages.'
  },
  {
    icon: Lightbulb,
    title: 'Strategic Thinking',
    description: 'Learning to plan ahead, evaluate positions, and adapt to changing circumstances builds strategic thinking skills.'
  },
  {
    icon: Heart,
    title: 'Improved Focus',
    description: 'Chess teaches patience and concentration that transfer to academic and professional success.'
  },
  {
    icon: Trophy,
    title: 'Competitive Spirit',
    description: 'Developing a healthy approach to competition and learning to win and lose gracefully.'
  },
  {
    icon: Users,
    title: 'Social Skills',
    description: 'Chess connects people across generations and cultures, fostering respect and sportsmanship.'
  },
  {
    icon: BarChart3,
    title: 'Academic Performance',
    description: 'Studies show chess players often exhibit improved memory, reading skills, and mathematics ability.'
  }
];

const BenefitsSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <span className="px-4 py-1 rounded-full bg-chess-navy text-chess-blue text-sm font-medium">
              Why Learn Chess
            </span>
          </div>
          <h2 className="section-title">Benefits of Chess</h2>
          <p className="section-subtitle">
            Chess is more than just a game. It's a powerful tool for developing minds and building character.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="feature-card">
              <div className="mb-6 w-12 h-12 rounded-full bg-chess-blue/20 flex items-center justify-center">
                <benefit.icon size={24} className="text-chess-blue" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
              <p className="text-gray-400">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
