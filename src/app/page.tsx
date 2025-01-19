import Image from "next/image";
import Link  from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Hero Section */}
      <header className="text-center flex flex-col items-center gap-4">
        <h1 className="text-4xl sm:text-6xl font-extrabold">
          Travel Blueprint
        </h1>
        <p className="text-lg sm:text-xl">
          Plan your perfect trip effortlessly. Explore, organize, and go!
        </p>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center gap-6">
        <Image
          src="/travelling.svg"
          alt="Travel planning illustration"
          width={300}
          height={200}
          priority
        />

        <Link href="/trips" className="block py-2 px-3 rounded hover:bg-gray-800">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" >
            Start Planning
          </button>
        </Link>
      </main>

      {/* Footer */}
      <footer className="text-center text-sm mt-16">
        <p>
          © {new Date().getFullYear()} Travel Blueprint. Built with{" "}
          <a
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline"
          >
            Next.js
          </a>{" "}
          and{" "}
          <a
            href="https://vercel.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline"
          >
            Vercel
          </a>
          .
        </p>
      </footer>
    </div>
  );
}