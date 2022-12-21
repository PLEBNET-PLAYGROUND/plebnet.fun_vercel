import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React from 'react'
import Button from 'antd/lib/button'
import Input from 'antd/lib/input'
import Link from 'next/link'
import Title from 'antd/lib/typography/Title'
import message from 'antd/lib/message'
import Text from 'antd/lib/typography/Text'
import { useWindowSize } from '../hooks'

export default function Home() {
	const dims = useWindowSize()
	const [getCoinsResult, setGetCoinsResult] = React.useState('')
	const [loading, setLoading] = React.useState(false)
	const [onChainAddress, setOnChainAddress] = React.useState('')

	const fetchCoinsClient = async () => {
		const res = await fetch(
			`/api/fetchCoins?onChainAddress=${onChainAddress}`,
			{
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'GET'
			}
		)

		const result = await res.json()
		if (result.data === 'Success') {
			message.success('Success')
		}

		setLoading(false)

		return setGetCoinsResult(result.status)
	}

	return (
		<div className={styles.container}>
			<Head>
				<title>Plebnet.fun</title>
				<meta name='description' content='Plebnet.fun' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className={styles.main}>
				<Title>
					Welcome to the <span style={{ color: '#1890ff' }}>Plebnet.fun </span>
					faucet
				</Title>

				<div style={{ marginBottom: 48 }}>
					<Image
						src='/playgroundCropped.png'
						alt='Vercel Logo'
						width={dims.width < 700 ? 703 / 3 : 703 / 1.5}
						height={dims.width < 700 ? 377 / 3 : 377 / 1.5}
					/>
				</div>

				<Title level={4}>Get test coins here:</Title>

				<div style={{ display: 'flex', width: '80%' }}>
					<div style={{ width: '100%', position: 'relative' }}>
						<Input
							value={onChainAddress}
							onChange={(e) => setOnChainAddress(e.target.value)}
							placeholder='Enter your on-chain address'
						/>
						{onChainAddress.substring(0, 3) !== 'tb1' &&
							onChainAddress.length > 3 && (
								<div style={{ position: 'absolute', bottom: -24, left: 0 }}>
									<Text type='danger'>must begin with tb1</Text>
								</div>
							)}
					</div>

					<Button
						disabled={
							onChainAddress.length < 1 ||
							onChainAddress.substring(0, 3) !== 'tb1' ||
							loading
						}
						style={{ marginLeft: 8 }}
						onClick={() => fetchCoinsClient()}
						type='primary'>
						Submit
					</Button>
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
					<Link href='/visualizer'>
						<a className={styles.card}>
							<h2>Visualizer &rarr;</h2>
							<p>A visualization of Plebnet.fun nodes</p>
						</a>
					</Link>
					<a href='https://explorer.plebnet.fun/' className={styles.card}>
						<h2>Block Explorer &rarr;</h2>
						<p>An educational Bitcoin explorer</p>
					</a>
				</div>
			</main>
		</div>
	)
}
