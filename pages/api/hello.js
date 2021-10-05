// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
	res.status(200).json({ name: 'John Doe' })
}

export async function getCoins(onChainAddress) {
	const url = `https://mysterious-journey-27455.herokuapp.com/http://signet.xenon.fun:5000/faucet?address=${onChainAddress}`
	const result = await fetch(url, {
		method: 'GET'
	})

	if (result.status === 200) {
		alert('Success')
	}

	return result

	//res.status(200).json({ result: result })
}
