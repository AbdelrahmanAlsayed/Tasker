import Link from 'next/link';

export default function Home() {
  return (
    <section className="p-20 flex flex-col items-center justify-center bg-white">
      <h1 className="text-4xl font-bold mb-4 text-black">Tasker</h1>
      <p className="text-lg text-center mb-6 text-gray-700 max-w-md">
        Tasker helps you efficiently organize, prioritize, and manage your daily
        tasks. Stay on top of your responsibilities and boost your productivity
        with an intuitive and user-friendly interface.
      </p>
      <Link href="/register">
        <button className="px-4 py-2 bg-black text-white rounded-md transition-colors duration-300 hover:bg-gray-700 hover:text-gray-100">
          Get Started
        </button>
      </Link>
    </section>
  );
}
