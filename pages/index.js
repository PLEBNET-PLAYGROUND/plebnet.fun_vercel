import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React from 'react'
import { getCoins } from './api/hello'

export default function Home() {
	const [onChainAddress, setOnChainAddress] = React.useState('')
	return (
		<div className={styles.container}>
			<Head>
				<title>Plebnet.fun</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>
					Welcome to the <a>Plebnet.fun</a> faucet
				</h1>
				<Image
					src='/playgroundCropped.png'
					alt='Vercel Logo'
					width={703 / 1.5}
					height={377 / 1.5}
				/>
				<p className={styles.description}>Get test coins here:</p>
				<div style={{ display: 'flex', width: '100%' }}>
					<input
						className={styles.input}
						autoComplete='off'
						//type="email"
						id='onChain-address-input-field'
						value={onChainAddress}
						onChange={(e) => setOnChainAddress(e.target.value)}
						//  onFocus={() => setFocused(true)}
						//  onBlur={() => setFocused(false)}
						placeholder='Enter your on-chain address'
						aria-label='your on-chain address'
					/>

					<button
						className={styles.submit}
						//	disabled={formState === 'loading'}
						onClick={() => getCoins(onChainAddress)}>
						Submit
					</button>
				</div>
				<div className={styles.grid}>
					<a
						href='https://plebnet.wiki/wiki/Plebnet_Playground'
						className={styles.card}>
						<h2>Wiki Page &rarr;</h2>
						<p>Find in-depth information about the Plebnet Playground</p>
					</a>

					<a
						href='https://github.com/PLEBNET-PLAYGROUND'
						className={styles.card}>
						<h2>GitHub &rarr;</h2>
						<p>All of the Plebnet Playground code in one place!</p>
					</a>

					<a
						href='https://github.com/PLEBNET-PLAYGROUND/plebnet-playground-docker#readme'
						className={styles.card}>
						<h2>Learn More &rarr;</h2>
						<p>An in depth explanation of plebnet</p>
					</a>

					{/* <a
						href='https://github.com/vercel/next.js/tree/master/examples'
						className={styles.card}>
						<h2>Examples &rarr;</h2>
						<p>Discover and deploy boilerplate example Next.js projects.</p>
					</a>

					<a
						href='https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
						className={styles.card}>
						<h2>Deploy &rarr;</h2>
						<p>
							Instantly deploy your Next.js site to a public URL with Vercel.
						</p>
					</a> */}
				</div>
			</main>

			{/* <footer className={styles.footer}>
				<a
					href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
					target='_blank'
					rel='noopener noreferrer'>
					Powered by{' '}
					<span className={styles.logo}>
						<Image src='/vercel.svg' alt='Vercel Logo' width={72} height={16} />
					</span>
				</a>
			</footer> */}
		</div>
	)
}
