import Calendar from "@/components/Calender";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black  transition-colors duration-300">
      <ThemeToggle />
      <div className="flex items-center justify-center min-h-screen">
        <Calendar />
      </div>
    </div>
  );
}
