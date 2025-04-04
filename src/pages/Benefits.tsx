
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BenefitsSection from "@/components/BenefitsSection";

const Benefits = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20">
        <div className="py-16 bg-chess-navy/30">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-4">Benefits of Chess</h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Discover the many ways that learning chess can enhance cognitive abilities and life skills.
              </p>
            </div>
          </div>
        </div>
        <BenefitsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Benefits;
