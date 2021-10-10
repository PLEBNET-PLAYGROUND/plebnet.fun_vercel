import styles from '../styles/Home.module.css'
import React from 'react'
import Input from 'antd/lib/input'
import Title from 'antd/lib/typography/Title'
import { useWindowSize } from '../hooks'
import { Graph } from 'react-d3-graph'
import useSWR from 'swr'
import { SearchOutlined } from '@ant-design/icons'
import debounce from 'just-debounce-it'

const placeholderNodes = {
	nodes: [],
	links: []
}

export default function Home() {
	const dims = useWindowSize()

	const myConfig = {
		automaticRearrangeAfterDropNode: false,
		collapsible: true,
		directed: false,
		focusAnimationDuration: 0.75,
		focusZoom: 1,
		freezeAllDragEvents: false,
		height: dims.height - 97 - 48 - 24 - 12,
		highlightDegree: 1,
		highlightOpacity: 1,
		linkHighlightBehavior: false,
		maxZoom: 12,
		minZoom: 0.1,
		nodeHighlightBehavior: false,
		panAndZoom: false,
		staticGraph: false,
		staticGraphWithDragAndDrop: false,
		width: dims.width,
		d3: {
			alphaTarget: 0.05,
			gravity: -100,
			linkLength: 100,
			linkStrength: 1,
			disableLinkForce: false
		},
		node: {
			color: '#d3d3d3',
			fontColor: 'black',
			fontSize: 8,
			fontWeight: 'normal',
			highlightColor: 'SAME',
			highlightFontSize: 8,
			highlightFontWeight: 'normal',
			highlightStrokeColor: 'SAME',
			highlightStrokeWidth: 'SAME',

			labelProperty: 'name',
			mouseCursor: 'pointer',
			opacity: 1,
			renderLabel: true,
			size: 200,
			strokeColor: 'none',
			strokeWidth: 1.5,
			svg: '',
			symbolType: 'circle'
		},
		link: {
			color: '#d3d3d3',
			fontColor: 'black',
			fontSize: 8,
			fontWeight: 'normal',
			highlightColor: 'SAME',
			highlightFontSize: 8,
			highlightFontWeight: 'normal',
			labelProperty: 'label',
			mouseCursor: 'pointer',
			opacity: 1,
			renderLabel: false,
			semanticStrokeWidth: false,
			strokeWidth: 0.5,
			markerHeight: 6,
			markerWidth: 6,
			strokeDasharray: 0,
			strokeDashoffset: 0,
			strokeLinecap: 'butt'
		}
	}

	const getNodes = (url) => fetch(url).then((_) => _.json())

	const { data: nodes } = useSWR(
		() =>
			`https://mysterious-journey-27455.herokuapp.com/http://signet.xenon.fun:5000/graph`,
		getNodes
	)

	const onClickNode = function (nodeId) {
		window.alert(`Clicked node ${nodeId}`)
	}

	const onClickLink = function (source, target) {
		window.alert(`Clicked link between ${source} and ${target}`)
	}

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

	return (
		<div className={styles.container}>
			<main className={styles.main}>
				<div style={{ marginTop: 48, marginBottom: 24 }}>
					<Title>Plebnet.fun visualizer</Title>
					<Input
						onChange={(e) => handleSearch(e)}
						style={{ width: 300 }}
						placeholder='Search...'
						suffix={<SearchOutlined style={{ color: 'rgba(0,0,0,.45)' }} />}
					/>
				</div>
				<div>
					<Graph
						id='graph-id'
						data={filteredNodes}
						config={myConfig}
						onClickNode={onClickNode}
						onClickLink={onClickLink}
					/>
				</div>
			</main>
		</div>
	)
}
