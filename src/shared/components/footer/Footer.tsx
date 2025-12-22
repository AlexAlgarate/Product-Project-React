import React from 'react';
import githubWhite from '@assets/githubWhite.svg';
import linkedin from '@assets/linkedin.svg';
import styles from './footer.module.css';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <span className={styles.text}>
          © {new Date().getFullYear()} — Developed by{' '}
          <strong className={styles.name}>Álex Algarate</strong>
        </span>
        <div className={styles.socials}>
          <a
            href="https://github.com/AlexAlgarate/product-project"
            className={styles.socialLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Github repository"
          >
            <img src={githubWhite} alt="Github logo" />
          </a>
          <a
            href="https://www.linkedin.com/in/alex-algarate/"
            className={styles.socialLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Linkedin profile"
          >
            <img src={linkedin} alt="Linkedin logo" />
          </a>
        </div>
      </div>
    </footer>
  );
};
