import styles from './topmenu.module.css';
import Link from 'next/link';
import { ReactNode } from 'react';

export default function TopMenuItem({ 
  title, 
  pageRef, 
  icon 
}: { 
  title: string, 
  pageRef: string,
  icon?: ReactNode 
}) {
  return (
    <Link href={pageRef} className={`${styles.itemcontainer} group`}>
      <div className="flex items-center gap-2">
        {icon && <span className="text-green-700 group-hover:text-green-900 transition-colors">
          {icon}
        </span>}
        <span className="text-green-800 group-hover:text-green-900 transition-colors">
          {title}
        </span>
      </div>
      <div className={styles.underline}></div>
    </Link>
  );
}
