
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "What age groups do you teach?",
    answer: "We teach chess to students of all ages, from young beginners (as young as 5 years old) to seniors. Our coaches tailor their teaching methods to match the student's age, learning style, and experience level, ensuring effective and engaging lessons for everyone."
  },
  {
    question: "How do online chess lessons work?",
    answer: "Our online chess lessons take place on a secure video conferencing platform with an integrated interactive chess board. Students can see and hear the coach, view the digital chess board, and make moves. Coaches can draw on the board to illustrate concepts and provide real-time feedback. All you need is a device with internet connection."
  },
  {
    question: "Do I need special equipment for online chess lessons?",
    answer: "No special equipment is required beyond a computer, tablet, or smartphone with a stable internet connection. A larger screen is recommended for the best experience, but not mandatory. For the best audio quality, we recommend using headphones with a microphone."
  },
  {
    question: "What if I miss a scheduled class?",
    answer: "We understand that scheduling conflicts can arise. If you need to miss a class, please notify us at least 24 hours in advance, and we'll help you reschedule. For group classes, we can provide notes and materials from the missed session."
  },
  {
    question: "How are students matched with coaches?",
    answer: "We carefully match students with coaches based on the student's skill level, learning goals, schedule, and learning style. Our goal is to find the perfect instructional fit to maximize your progress. You can request to change coaches if you feel another instructor might be a better fit."
  },
  {
    question: "Can I switch between individual and group lessons?",
    answer: "Yes, you can switch between individual and group lessons. Many students find a combination of both beneficial – individual lessons for personalized attention and group lessons for the collaborative learning experience. Contact us to discuss your specific needs and preferences."
  },
  {
    question: "What teaching methods do your coaches use?",
    answer: "Our coaches employ a variety of teaching methods tailored to each student's needs, including position analysis, puzzle solving, game review, strategic planning, and guided practice. We emphasize understanding concepts rather than memorization, helping students develop their chess intuition and analytical skills."
  },
  {
    question: "Is there homework between lessons?",
    answer: "Yes, coaches typically assign tailored homework to reinforce concepts learned during lessons. This may include puzzles, specific positions to analyze, games to play online, or videos to watch. The amount of homework depends on the student's level, goals, and available time."
  },
  {
    question: "How long does it take to see improvement?",
    answer: "Improvement varies depending on the student's starting level, frequency of lessons, time devoted to practice, and natural aptitude. Many students notice increased understanding within a few weeks, while significant rating improvements may take several months of consistent study and practice."
  },
  {
    question: "Do you offer a trial or demo lesson?",
    answer: "Yes, we offer a free 30-minute demo lesson for new students. This allows you to experience our teaching approach, meet a coach, and determine if our program is the right fit for your chess learning journey. You can book your free demo directly on our website."
  }
];

const FAQ = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20">
        <div className="py-16 bg-chess-navy/30">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Everything you need to know about our chess programs and online learning process.
              </p>
            </div>
          </div>
        </div>
        
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-3xl">
            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((item, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="bg-chess-navy rounded-lg px-6 py-2 border-none"
                >
                  <AccordionTrigger className="text-white hover:text-chess-blue text-lg font-medium py-4">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300 pb-4">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
