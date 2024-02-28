'use client'
import Head from 'next/head'
import React from 'react'
import Link from 'next/link'
import axios from '../../node_modules/axios/index'
import Image from '../../node_modules/next/image'
export default function Home() {
	const [loading, setLoading] = React.useState(false)
	const [onChainAddress, setOnChainAddress] = React.useState('')

	const fetchCoinsClient = async () => {
		try {
			const result = await axios.post('/api', {
				data: {
					onChainAddress
				}
			})

			if (result.data === 'Success') {
				alert('Success')
			} else {
				alert('Failed')
			}
		} catch (e) {
			alert('Failed, see console for more info')
			console.error(e)
		}

		setLoading(false)
	}

	return (
		<div id='home' className={`lg:p-28 sm:p-2  flex flex-col items-center`}>
			<Head>
				<title>Plebnet.fun</title>
				<meta name='description' content='Plebnet.fun' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className=''>
				<h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl w-full text-center my-8'>
					Welcome to the <span className='text-blue-500'>Plebnet.fun </span>
					faucet
				</h1>

				<div className='mb-18 relative border-2 border-slate-300 rounded p-8 lg:m-28  sm:mt-8'>
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
				<div className='flex justify-center mb-4 lg:mb-0'>
					<Image
						priority
						src='/playgroundCropped.png'
						alt='Vercel Logo'
						width={400}
						height={90}
					/>
				</div>

				<div className='grid sm:grid-cols-3 grid-cols-1'>
					<a
						href='https://plebnet.wiki/wiki/Plebnet_Playground'
						className='card'>
						<h2 className='text-blue-500'>Wiki Page &rarr;</h2>
						<p>Find in-depth information about the Plebnet Playground</p>
					</a>

					<a href='https://github.com/PLEBNET-PLAYGROUND' className='card'>
						<h2 className='text-blue-500'>GitHub &rarr;</h2>
						<p>All of the Plebnet Playground code in one place!</p>
					</a>

					<a
						href='https://github.com/PLEBNET-PLAYGROUND/plebnet-playground-docker#readme'
						className='card'>
						<h2 className='text-blue-500'>Learn More &rarr;</h2>
						<p>An in depth explanation of plebnet</p>
					</a>
					<Link href='/visualizer' className='card'>
						<h2 className='text-blue-500'>Visualizer &rarr;</h2>
						<p>A visualization of Plebnet.fun nodes</p>
					</Link>
					<a href='https://ex.plebnet.bublina.eu.org/' className='card'>
						<h2 className='text-blue-500'>Block Explorer &rarr;</h2>
						<p>An educational Bitcoin explorer</p>
					</a>
				</div>
			</main>
		</div>
	)
}
