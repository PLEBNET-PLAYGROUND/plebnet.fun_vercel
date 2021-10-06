import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React from 'react'
import Button from 'antd/lib/button'
import Input from 'antd/lib/input'
import Space from 'antd/lib/space'
import Typography from 'antd/lib/typography'
import Divider from 'antd/lib/divider'
import Title from 'antd/lib/typography/Title'
import message from 'antd/lib/message'
import Text from 'antd/lib/typography/Text'
import { useRouter } from 'next/router'
import { useWindowSize } from '../hooks'

export default function Home() {
	const router = useRouter()
	const dims = useWindowSize()
	const [getCoinsResult, setGetCoinsResult] = React.useState('')
	const [loading, setLoading] = React.useState(false)
	const [onChainAddress, setOnChainAddress] = React.useState('')

	const fetchCoins = async () => {
		setLoading(true)
		const url = `https://mysterious-journey-27455.herokuapp.com/http://signet.xenon.fun:5000/faucet?address=${onChainAddress}`
		const result = await fetch(url, {
			method: 'GET'
		})

		if (result.status === 200) {
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
						onClick={() => fetchCoins()}
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
				</div>
			</main>

			{/* <footer className={styles.footer}>
				<Space
					style={{ justifyContent: 'center', flexWrap: 'wrap' }}
					split={<Divider type='vertical' />}>
					<Button
						block
						onClick={() =>
							router.push('https://plebnet.wiki/wiki/Plebnet_Playground')
						}
						type='primary'
						ghost>
						Wiki Page &rarr;
					</Button>

					<Button
						block
						onClick={() => router.push('https://github.com/PLEBNET-PLAYGROUND')}
						type='primary'
						ghost>
						GitHub &rarr;
					</Button>

					<Button
						block
						onClick={() =>
							router.push(
								'https://github.com/PLEBNET-PLAYGROUND/plebnet-playground-docker#readme'
							)
						}
						type='primary'
						ghost>
						More Info &rarr;
					</Button>
				</Space>
			</footer> */}
		</div>
	)
}
