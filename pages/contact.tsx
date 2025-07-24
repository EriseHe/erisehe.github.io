import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/InfoPage.module.css'

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact - Erise He</title>
        <meta name="description" content="Get in touch with Erise He for collaboration, research opportunities, or academic discussion." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <main className={styles.container}>
        <div className={styles.content}>
          <Link href="/" className={styles.backLink}>
            ← Back to Home
          </Link>
          
          <h1 className={styles.title}>Contact</h1>
          
          <div className={styles.text}>
            <p>
              I'm always interested in discussing research, collaboration opportunities, 
              or academic exchanges related to my work.
            </p>
            
            <div className={styles.contactInfo}>
              <h3>Academic Inquiries</h3>
              <p>For research collaboration, academic discussions, or project inquiries, please reach out through appropriate academic channels.</p>
              
              <h3>Research Interests</h3>
              <p>
                I'm particularly interested in connecting with researchers working on:
              </p>
              <ul>
                <li>Topological data analysis</li>
                <li>Geometric deep learning applications</li>
                <li>Cognitive modeling and psychoanalytic theory</li>
                <li>Mathematical foundations of AI</li>
              </ul>
              
              <h3>Professional Network</h3>
              <p>
                Connect with me through academic and professional networks for research collaboration 
                and scholarly exchange.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
} 