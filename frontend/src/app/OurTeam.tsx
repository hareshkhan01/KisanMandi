import { Card } from "@/components/ui/card";
import { Linkedin, Twitter, Github } from "lucide-react";

const teamData = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "Co-Founder & CEO",
    description: "Agricultural tech enthusiast with 10+ years in supply chain management",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#"
    },
    image: "/placeholder-avatar.jpg"
  },
  {
    id: 2,
    name: "Priya Patel",
    role: "CTO",
    description: "Full-stack developer specializing in blockchain solutions",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#"
    },
    image: "/placeholder-avatar.jpg"
  },
  {
    id: 3,
    name: "Arjun Singh",
    role: "Head of Operations",
    description: "Expert in agricultural logistics and quality control",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#"
    },
    image: "/placeholder-avatar.jpg"
  },
  {
    id: 4,
    name: "Arjun Singh",
    role: "Head of Operations",
    description: "Expert in agricultural logistics and quality control",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#"
    },
    image: "/placeholder-avatar.jpg"
  },
];

export default function OurTeam() {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-200">
          Our Leadership Team
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Passionate individuals driving agricultural innovation
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamData.map((member) => (
          <Card key={member.id} className="p-6 dark:bg-gray-800 dark:border-gray-700">
            <div className="mb-4 rounded-full bg-gray-100 dark:bg-gray-700 h-48 w-48 mx-auto flex items-center justify-center">
              {/* Replace with actual image */}
              <span className="text-gray-400 dark:text-gray-300 text-4xl">👤</span>
            </div>
            <h3 className="text-xl font-bold text-center mb-2 text-gray-800 dark:text-gray-200">
              {member.name}
            </h3>
            <p className="text-center text-green-600 dark:text-green-400 mb-4">
              {member.role}
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
              {member.description}
            </p>
            <div className="flex justify-center space-x-4">
              <a 
                href={member.social.linkedin} 
                className="text-gray-500 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a 
                href={member.social.twitter} 
                className="text-gray-500 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a 
                href={member.social.github} 
                className="text-gray-500 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              >
                <Github className="h-6 w-6" />
              </a>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}