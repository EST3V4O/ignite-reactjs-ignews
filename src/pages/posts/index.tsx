import Head from 'next/head'
import styles from './styles.module.scss'

export default function Posts()   {
  return (
    <>
      <Head>Posts | Ignews</Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a>
            <time>12 de março</time>
            <strong>Title</strong>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
          </a>
        </div>
      </main>
    </>
  )
}