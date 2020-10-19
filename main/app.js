import styles from '../styles/main.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Reactjs App</title>
        <link rel="icon" href="https://reactjs.org/" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://reactjs.org/">React.js!</a>
        </h1>

        

        
      </main>

      <footer className={styles.footer}>
        <a
          href="https://reactjs.org/docs/create-a-new-react-app.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
        </a>
      </footer>
    </div>
  )
}
