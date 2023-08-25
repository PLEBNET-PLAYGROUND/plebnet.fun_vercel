import Image from 'next/image'
import axios from '../../../node_modules/axios/index'
import Visualizer from './Visualizer'
export default async function Home() {
	const url = `http://signet.xenon.fun:5000/graph`
	const result = await axios.get(url)
	return <Visualizer nodes={result.data} />
}
