import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/InfoPage.module.css'

export default function About() {
  return (
    <>
      <Head>
        <title>About - Erise He</title>
        <meta name="description" content="About Erise He - Applied mathematics and physics student working on topology of data and geometric deep learning." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <main className={styles.container}>
        <div className={styles.content}>
          <Link href="/" className={styles.backLink}>
            ← Back to Home
          </Link>
          
          <h1 className={styles.title}>About</h1>
          
          <div className={styles.text}>
            <p>
              I'm Erise He, an applied mathematics and physics student with a passion for exploring 
              the intersection of topology, data science, and cognitive analysis.
            </p>
            
            <p>
              My research focuses on three main areas:
            </p>
            
            <ul>
              <li><strong>Topology of Data:</strong> Understanding the geometric and topological structure underlying complex datasets</li>
              <li><strong>Geometric Deep Learning:</strong> Developing neural network architectures that respect geometric principles</li>
              <li><strong>Psychoanalysis of Cognition:</strong> Exploring cognitive processes through psychoanalytic frameworks</li>
            </ul>
            
            <p>
              This intersection of mathematical rigor and human understanding drives my work toward 
              creating more intuitive and meaningful AI systems.
            </p>
          </div>
        </div>
      </main>
    </>
  )
} 