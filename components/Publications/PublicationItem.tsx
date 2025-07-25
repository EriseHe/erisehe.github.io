import { Publication } from '../../lib/publications';
import styles from '../../styles/Publications.module.css';

interface PublicationItemProps {
  publication: Publication;
  index: number;
}

export default function PublicationItem({ publication, index }: PublicationItemProps) {
  return (
    <div className={styles.publicationItem} data-index={index}>
      <div className={styles.publicationContent}>
        <h3 className={styles.publicationTitle}>
          <a href={publication.url} target="_blank" rel="noopener noreferrer">
            {publication.title}
          </a>
        </h3>
        
        <p className={styles.publicationAuthors}>
          {publication.authors.join(', ')}
        </p>
        
        <div className={styles.publicationMeta}>
          <span className={styles.publicationJournal}>{publication.journal}</span>
          <span className={styles.publicationYear}>{publication.year}</span>
          {publication.doi && (
            <span className={styles.publicationDoi}>
              <a href={`https://doi.org/${publication.doi}`} target="_blank" rel="noopener noreferrer">
                DOI: {publication.doi}
              </a>
            </span>
          )}
        </div>
        
        {/* Removed abstract for compact view */}
        
        {/* Simplified tags - just show one main tag */}
        {publication.tags.length > 0 && (
          <span className={styles.publicationTag}>
            {publication.tags[0]}
          </span>
        )}
      </div>
      
      <div className={styles.publicationActions}>
        <a 
          href={publication.url} 
          className={styles.publicationLink}
          target="_blank" 
          rel="noopener noreferrer"
        >
          Read Paper
        </a>
      </div>
    </div>
  );
} 