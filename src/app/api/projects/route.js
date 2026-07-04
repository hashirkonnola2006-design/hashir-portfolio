import { NextResponse } from "next/server";

export async function GET() {
  const projects = [
    {
      id: "ktuprephub",
      title: "KTU PrepHub",
      description: "A comprehensive academic portal for APJ Abdul Kalam Technological University (KTU) students. Providing high-quality study materials, notes, question papers, and syllabus updates in a unified, modern interface.",
      url: "https://ktuprephub.vercel.app/",
      tags: ["HTML", "CSS", "JavaScript", "Education", "Vercel"],
      icon: "学",
      color: "from-blue-600 to-indigo-600"
    },
    {
      id: "mandhi-website",
      title: "Mandhi Resto",
      description: "A responsive and visually rich web application for a traditional Mandhi restaurant. Showcases items like Chicken, Lamb, and Mutton Mandhi, integrates a custom reservation system, and features a backend database.",
      url: "https://mandhi-website.vercel.app/",
      tags: ["Node.js", "Express", "Lowdb", "Vanilla JS", "Vanilla CSS"],
      icon: "食",
      color: "from-orange-600 to-red-600"
    },
    {
      id: "ktu-canteen",
      title: "KTU Canteen Menu",
      description: "An interactive, mobile-optimized digital canteen menu system designed to streamline food ordering, reduce queue times, and display live availability of menu items for university students.",
      url: "https://ktu-canteen.vercel.app/menu.html",
      tags: ["HTML", "CSS", "JavaScript", "Canteen API", "UI/UX"],
      icon: "味",
      color: "from-emerald-600 to-teal-600"
    },
    {
      id: "linkedin-undo",
      title: "LinkedIn Undo",
      description: "A productivity extension designed for LinkedIn professionals. Allows users to undo post publishes, comments, or connection requests within a custom grace period to prevent networking mishaps.",
      url: "#",
      tags: ["Chrome Extension", "JavaScript", "LinkedIn API", "Productivity"],
      icon: "業",
      color: "from-blue-700 to-sky-700",
      status: "Currently under working"
    }
  ];

  return NextResponse.json(projects);
}
