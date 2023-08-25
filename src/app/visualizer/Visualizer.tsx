'use client'
import React from 'react'
import dynamic from 'next/dynamic'
import debounce from 'just-debounce-it'
import Link from 'next/link'

type Node = any
const ForceGraph3D = dynamic(() => import('react-force-graph-3d'), {
	ssr: false
})

const placeholderNodes = {
	nodes: [],
	links: []
}

export default function Home({ nodes }: { nodes: Node }) {
	const getNodesFetch = async () => {
		const res = await fetch('/api/getNodes', {
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'GET'
		})

		const result = await res.json()
		return result.data
	}

	const handleSearch = debounce((e: any) => {
		setSearchTerm(e.target.value)
	}, 500)

	const [searchTerm, setSearchTerm] = React.useState('')

	const filteredNodes = React.useMemo(() => {
		if (!nodes) return placeholderNodes
		const _searchTerm = searchTerm.toLowerCase()
		const _nodes = JSON.parse(JSON.stringify(nodes))
		let _links = JSON.parse(JSON.stringify(nodes.links))
		if (searchTerm.length > 0) {
			_links = _links.filter(
				(link: any) =>
					link.source.toLowerCase().includes(_searchTerm) ||
					link.target.toLowerCase().includes(_searchTerm)
			)
			_nodes.links = _links
		}

		return _nodes
	}, [nodes, searchTerm])

	const createNodeLabel = (node: Node) => {
		const { id, name } = node

		return `
				<div style="color: black; z-index: 99999;">	
						<div>${name}</div>
						<div style="color: grey;">${id}</div>
				</div>
		`
	}

	// if (isError) {
	// 	return (
	// 		<div>
	// 			There was an error with the API fetching the nodes:{' '}
	// 			{JSON.stringify(error)}
	// 		</div>
	// 	)
	// }

	return (
		<div className=''>
			<main className=''>
				<div
					style={{
						zIndex: 99999,
						position: 'absolute',
						top: 24,
						left: 24
					}}>
					<h2 className='text-3xl mb-2'>
						<Link href='/' className='text-blue-500'>
							Plebnet.fun{' '}
						</Link>
						nodes
					</h2>

					<div className='mb-3'>
						<input
							type='search'
							className='rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary'
							placeholder='Search by Node ID'
							aria-label='Search'
							aria-describedby='button-addon2'
							onChange={(e) => handleSearch(e)}
						/>
					</div>
				</div>
				{filteredNodes?.links?.length > 0 ? (
					<div>
						<ForceGraph3D
							linkWidth={0.8}
							linkDirectionalParticles={6}
							backgroundColor='white'
							graphData={filteredNodes}
							nodeLabel={createNodeLabel}
						/>
					</div>
				) : (
					<div>No search results found.</div>
				)}

				<div
					style={{
						zIndex: 99999,
						position: 'absolute',
						bottom: 10,
						right: 24
					}}>
					<a href='https://tippin.me/@sndbtc'>
						<div style={{ display: 'flex' }}>
							<div style={{ marginTop: 3 }}>Tip me</div>
						</div>
					</a>
				</div>
			</main>
		</div>
	)
}
