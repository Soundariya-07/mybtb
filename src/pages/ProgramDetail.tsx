
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check, Calendar, Clock, GraduationCap, Users, BookOpen } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

// Program data
const programsData = {
  'beginner': {
    title: 'Beginner Chess Course',
    subtitle: 'Learn the foundations of chess',
    description: 'Perfect for those who are new to chess. Learn the fundamentals of the game, piece movements, and basic strategies.',
    image: '/lovable-uploads/e6abee08-2d7f-423b-8d9e-d6d18d1600f3.png',
    duration: '12 weeks',
    sessions: '1-2 sessions per week',
    level: 'Beginner (0-800 rating)',
    groupSize: '4-6 students per group',
    curriculum: [
      'Basic piece movements and rules of chess',
      'Understanding the value of pieces',
      'Basic checkmates (King and Queen, King and Rook)',
      'Opening principles and common mistakes to avoid',
      'Basic tactics (pins, forks, skewers)',
      'Introduction to pawn structure',
      'Elementary endgames',
      'Practice games with analysis'
    ],
    outcomes: [
      'Confidently set up the board and move pieces correctly',
      'Understand the basic rules and objectives of chess',
      'Apply fundamental tactical patterns',
      'Play a complete game from opening to endgame',
      'Analyze your own games to identify mistakes',
      'Solve basic chess puzzles'
    ]
  },
  'intermediate-1': {
    title: 'Intermediate I Chess Course',
    subtitle: 'Develop tactical awareness and positional understanding',
    description: 'Building on fundamentals, this program teaches tactical patterns, planning, and middle game concepts.',
    image: '/lovable-uploads/f4184eb7-c262-47fc-9d1e-fe309c2ebdf6.png',
    duration: '16 weeks',
    sessions: '1-2 sessions per week',
    level: 'Intermediate (800-1400 rating)',
    groupSize: '4-6 students per group',
    curriculum: [
      'Tactical patterns and combinations',
      'Opening theory for common openings',
      'Middle game planning and strategy',
      'Pawn structure analysis',
      'Basic endgame theory',
      'Calculation techniques',
      'Attacking the king',
      'Defensive techniques',
      'Tournament preparation',
      'Game analysis and improvement methods'
    ],
    outcomes: [
      'Recognize and execute tactical patterns',
      'Develop coherent plans in the middle game',
      'Apply strategic concepts like piece coordination',
      'Execute basic endgame techniques',
      'Analyze positions critically',
      'Improve calculation and visualization skills',
      'Develop a basic opening repertoire'
    ]
  },
  'intermediate-2': {
    title: 'Intermediate II Chess Course',
    subtitle: 'Advanced concepts and strategic thinking',
    description: 'For improving players, focusing on deeper strategic understanding, complex tactics, and specific openings.',
    image: '/lovable-uploads/9051c81a-ebc3-4a44-bc96-0a0b7d627393.png',
    duration: '16 weeks',
    sessions: '1-2 sessions per week',
    level: 'Advanced Intermediate (1400-1800 rating)',
    groupSize: '3-5 students per group',
    curriculum: [
      'Advanced tactical patterns',
      'Comprehensive opening repertoire development',
      'Deep strategic planning',
      'Complex pawn structures',
      'Piece coordination and activity',
      'Advanced endgame techniques',
      'Calculation training',
      'Positional sacrifices',
      'Dynamic vs. static positions',
      'Tournament psychology and preparation'
    ],
    outcomes: [
      'Develop sophisticated strategic understanding',
      'Execute complex tactical combinations',
      'Build and maintain a personalized opening repertoire',
      'Evaluate positions accurately',
      'Improve calculation depth and accuracy',
      'Handle different pawn structures effectively',
      'Apply psychological aspects in competition'
    ]
  },
  'advanced': {
    title: 'Advanced Chess Course',
    subtitle: 'Master-level training and tournament preparation',
    description: 'Elite training for serious competitors, covering sophisticated strategies, deep analysis, and tournament preparation.',
    image: '/lovable-uploads/f4184eb7-c262-47fc-9d1e-fe309c2ebdf6.png',
    duration: '20 weeks',
    sessions: '1-2 sessions per week',
    level: 'Advanced (1800+ rating)',
    groupSize: '2-4 students per group',
    curriculum: [
      'Critical position analysis',
      'Advanced opening theory and preparation',
      'Deep strategic concepts',
      'Complex endgame theory',
      'Calculation training and exercises',
      'Practical decision-making in complex positions',
      'Analysis of grandmaster games',
      'Tournament preparation and psychology',
      'Personal game analysis and improvement',
      'Advanced training methods and resources'
    ],
    outcomes: [
      'Analyze positions at an advanced level',
      'Develop deep understanding of complex positions',
      'Create and execute sophisticated strategic plans',
      'Excel in tournament play',
      'Apply theoretical knowledge practically',
      'Refine calculation and visualization abilities',
      'Develop deep opening preparation'
    ]
  }
};

const ProgramDetail = () => {
  const { programId } = useParams();
  const [program, setProgram] = useState(null);

  useEffect(() => {
    // Get program data based on URL parameter
    if (programId && programsData[programId]) {
      setProgram(programsData[programId]);
    }
  }, [programId]);

  if (!program) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow py-24 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-3xl font-bold text-white mb-4">Program Not Found</h1>
            <p className="text-gray-400 mb-8">The program you're looking for doesn't exist.</p>
            <Link to="/programs">
              <Button>View All Programs</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="bg-chess-navy/30 py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-4xl font-bold text-white mb-3">{program.title}</h1>
                <p className="text-xl text-chess-blue mb-6">{program.subtitle}</p>
                <p className="text-gray-300 mb-8">{program.description}</p>
                <Link to="/book-demo">
                  <Button className="bg-chess-blue hover:bg-chess-blue/90 text-white">
                    Book a Free Demo Class
                  </Button>
                </Link>
              </div>
              <div className="relative">
                <div className="w-full h-[300px] rounded-xl overflow-hidden">
                  <img 
                    src={program.image} 
                    alt={program.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-chess-deepNavy/60 to-transparent rounded-xl"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Course Details */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="bg-chess-navy rounded-xl p-6 flex items-center space-x-4">
                <div className="bg-chess-blue/20 p-3 rounded-full">
                  <Calendar className="text-chess-blue h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-white text-lg font-medium">Duration</h3>
                  <p className="text-gray-400">{program.duration}</p>
                </div>
              </div>
              
              <div className="bg-chess-navy rounded-xl p-6 flex items-center space-x-4">
                <div className="bg-chess-blue/20 p-3 rounded-full">
                  <Clock className="text-chess-blue h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-white text-lg font-medium">Sessions</h3>
                  <p className="text-gray-400">{program.sessions}</p>
                </div>
              </div>
              
              <div className="bg-chess-navy rounded-xl p-6 flex items-center space-x-4">
                <div className="bg-chess-blue/20 p-3 rounded-full">
                  <GraduationCap className="text-chess-blue h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-white text-lg font-medium">Level</h3>
                  <p className="text-gray-400">{program.level}</p>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <BookOpen className="mr-3 text-chess-blue" />
                    Curriculum
                  </h2>
                  <ul className="space-y-3">
                    {program.curriculum.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="text-chess-blue min-w-[20px] mr-3 mt-1" />
                        <span className="text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <Users className="mr-3 text-chess-blue" />
                    Learning Outcomes
                  </h2>
                  <ul className="space-y-3">
                    {program.outcomes.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="text-chess-blue min-w-[20px] mr-3 mt-1" />
                        <span className="text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-chess-navy p-8 rounded-xl">
                  <h3 className="text-xl font-bold text-white mb-4">Ready to start your chess journey?</h3>
                  <p className="text-gray-300 mb-6">Join our {program.title} and take your chess skills to the next level.</p>
                  <div className="flex flex-wrap gap-4">
                    <Link to="/pricing">
                      <Button className="bg-chess-blue hover:bg-chess-blue/90 text-white">
                        View Pricing
                      </Button>
                    </Link>
                    <Link to="/book-demo">
                      <Button variant="outline" className="border-chess-blue/20 text-chess-blue hover:bg-chess-blue/10">
                        Book a Free Demo
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProgramDetail;
