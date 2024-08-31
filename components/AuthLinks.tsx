import Link from "next/link";

interface AuthLinkProps {
  text: string;
  linkText: string;
  href: string;
}

const AuthLink: React.FC<AuthLinkProps> = ({ text, linkText, href }) => {
  return (
    <p className="text-sm text-gray-700 mt-3">
      {text}{" "}
      <Link href={href} className="text-blue-500 hover:underline">
        {linkText}
      </Link>
    </p>
  );
};

export default AuthLink;
