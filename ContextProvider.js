import React, { useState, useContext, useEffect } from 'react'

const MyContext = React.createContext()

export function useMyContext() {
	return useContext(MyContext)
}

export function MyProvider({ children }) {
	const [myValue, setMyValue] = useState(false)

	return (
		<MyContext.Provider value={{ myValue, setMyValue }}>
			{children}
		</MyContext.Provider>
	)
}
