
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProgramsSection from "@/components/ProgramsSection";

const Programs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20">
        <div className="py-16 bg-chess-navy/30">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-4">Our Chess Programs</h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Comprehensive chess education for players at every level, from beginners to advanced competitors.
              </p>
            </div>
          </div>
        </div>
        <ProgramsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Programs;
