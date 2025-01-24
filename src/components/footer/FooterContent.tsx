const FooterContent = () => {
  return (
    <footer className="text-center text-sm py-8">
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
  );
};

export default FooterContent;