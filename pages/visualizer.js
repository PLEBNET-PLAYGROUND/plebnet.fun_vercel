import styles from '../styles/Home.module.css'
import React from 'react'
import Input from 'antd/lib/input'
import Title from 'antd/lib/typography/Title'
import useSWR from 'swr'
import { SearchOutlined } from '@ant-design/icons'
import dynamic from 'next/dynamic'
import debounce from 'just-debounce-it'
import Image from 'next/image'
import Link from 'next/link'

const ForceGraph3D = dynamic(() => import('react-force-graph-3d'), {
	ssr: false
})

const placeholderNodes = {
	nodes: [],
	links: []
}

export default function Home() {
	const getNodes = (url) => fetch(url).then((_) => _.json())

	const { data: nodes } = useSWR(
		() =>
			`https://mysterious-journey-27455.herokuapp.com/http://signet.xenon.fun:5000/graph`,
		getNodes
	)

	const handleSearch = debounce((e) => {
		setSearchTerm(e.target.value)
	}, 500)

	const [searchTerm, setSearchTerm] = React.useState('')

	const filteredNodes = React.useMemo(() => {
		if (!nodes) return placeholderNodes

		const _nodes = JSON.parse(JSON.stringify(nodes))
		let _links = JSON.parse(JSON.stringify(nodes.links))
		if (searchTerm.length > 0) {
			_links = _links.filter(
				(link) =>
					link.source.includes(searchTerm) || link.target.includes(searchTerm)
			)
		}
		_nodes.links = _links
		return _nodes
	}, [nodes, searchTerm])

	const createNodeLabel = (node) => {
		const { id, name } = node

		return `
				<div style="color: black; z-index: 99999;">	
						<div>${name}</div>
						<div style="color: grey;">${id}</div>
				</div>
		`
	}

	return (
		<div className={styles.container}>
			<main className={styles.main}>
				<div
					style={{
						zIndex: 99999,
						position: 'absolute',
						top: 24,
						left: 24
					}}>
					<Title>
						<Link href='/'>Plebnet.fun </Link>
						nodes
					</Title>
					<Input
						onChange={(e) => handleSearch(e)}
						placeholder='Search...'
						suffix={<SearchOutlined style={{ color: 'rgba(0,0,0,.45)' }} />}
					/>
				</div>

				<div>
					<ForceGraph3D
						linkWidth={0.8}
						linkDirectionalParticles={6}
						backgroundColor='white'
						graphData={filteredNodes}
						nodeLabel={createNodeLabel}
					/>
				</div>

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
							<Image
								src='/eggplant.svg'
								alt='Vercel Logo'
								width={24}
								height={24}
							/>
						</div>
					</a>
				</div>
			</main>
		</div>
	)
}
