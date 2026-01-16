import { Link } from 'react-router';

type FooterProps = {
  readonly text: string;
  readonly hrefLink: string;
  readonly textLink: string;
};

export const FooterAuth: React.FC<FooterProps> = ({ text, hrefLink, textLink }) => {
  return (
    <div className="mt-4.5 sm:mt-6 pt-6 border-t border-t-white/10 text-center">
      <p className="m-0 text-text-muted text-[0.9rem]">
        {text}
        <Link
          to={hrefLink}
          className="text-indigo-500 font-semibold no-underline! transition-colors duration-200 hover:text-primary-hover! hover:underline!"
        >
          {textLink}
        </Link>
      </p>
    </div>
  );
};
