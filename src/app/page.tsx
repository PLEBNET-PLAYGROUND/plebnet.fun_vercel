'use client'
import Head from 'next/head'
import React from 'react'
import Link from 'next/link'
import { useWindowSize } from '../hooks'
import axios from '../../node_modules/axios/index'
import Links from './../components/Links'
import Image from '../../node_modules/next/image'
export default function Home() {
	const dims = useWindowSize()
	const [getCoinsResult, setGetCoinsResult] = React.useState('')
	const [loading, setLoading] = React.useState(false)
	const [onChainAddress, setOnChainAddress] = React.useState('')

	const fetchCoinsClient = async () => {
		const result = await axios.post('/api', {
			data: {
				onChainAddress
			}
		})

		if (result.data === 'Success') {
			alert('Success')
		}

		setLoading(false)

		return setGetCoinsResult(result.statusText)
	}

	return (
		<div className='p-2 flex flex-col items-center'>
			<Head>
				<title>Plebnet.fun</title>
				<meta name='description' content='Plebnet.fun' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className=''>
				<h1 className='mt-8 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
					Welcome to the <span style={{ color: '#1890ff' }}>Plebnet.fun </span>
					faucet
				</h1>

				<div className='flex justify-center' style={{ marginBottom: 48 }}>
					<Image
						priority
						src='/playgroundCropped.png'
						alt='Vercel Logo'
						width={500}
						height={100}
						//	width={dims?.width < 700 ? 703 / 3 : 703 / 1.5}
						//	height={dims?.width < 700 ? 377 / 3 : 377 / 1.5}
					/>
				</div>

				<div className='mb-4 relative'>
					<label className='block text-gray-700 text-sm font-bold mb-2'>
						Get test coins here:
					</label>
					<div className='flex gap-2'>
						<input
							className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
							value={onChainAddress}
							onChange={(e) => setOnChainAddress(e.target.value)}
							placeholder='Enter your on-chain address'
						/>
						<button
							disabled={
								onChainAddress.length < 1 ||
								onChainAddress.substring(0, 3) !== 'tb1' ||
								loading
							}
							className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
							onClick={() => fetchCoinsClient()}>
							Submit
						</button>
					</div>

					{onChainAddress.substring(0, 3) !== 'tb1' &&
						onChainAddress.length > 3 && (
							<div style={{ position: 'absolute', bottom: -24, left: 0 }}>
								<div className='text-red-400'>must begin with tb1</div>
							</div>
						)}
				</div>

				{/* <Links /> */}

				<div className=''>
					<a
						href='https://plebnet.wiki/wiki/Plebnet_Playground'
						className='p-2 w-24'>
						<h2 className='text-blue-500'>Wiki Page &rarr;</h2>
						<p>Find in-depth information about the Plebnet Playground</p>
					</a>

					<a href='https://github.com/PLEBNET-PLAYGROUND' className='p-2'>
						<h2 className='text-blue-500'>GitHub &rarr;</h2>
						<p>All of the Plebnet Playground code in one place!</p>
					</a>

					<a
						href='https://github.com/PLEBNET-PLAYGROUND/plebnet-playground-docker#readme'
						className='p-2'>
						<h2 className='text-blue-500'>Learn More &rarr;</h2>
						<p>An in depth explanation of plebnet</p>
					</a>
					<Link href='/visualizer'>
						<h2 className='text-blue-500'>Visualizer &rarr;</h2>
						<p>A visualization of Plebnet.fun nodes</p>
					</Link>
					<a href='https://explorer.plebnet.fun/' className='p-2'>
						<h2 className='text-blue-500'>Block Explorer &rarr;</h2>
						<p>An educational Bitcoin explorer</p>
					</a>
				</div>
			</main>
		</div>
	)
}
