import axios from 'axios'

export default async function handler(req, res) {
	const url = `http://signet.xenon.fun:5000/faucet?address=${req.query.onChainAddress}`
	const result = await axios.get(url)
	res.status(200).json({ data: result.data })
}
