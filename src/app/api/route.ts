import axios from 'axios'

import { NextResponse } from 'next/server'
import { NextRequest } from '../../../node_modules/next/server'

export async function POST(req: NextRequest) {
	const res = await req.json()
	console.log('req', res)
	const url = `http://signet.xenon.fun:5000/faucet?address=${res.data.onChainAddress}`
	const result = await axios.get(url)

	return NextResponse.json(result.data)
}
