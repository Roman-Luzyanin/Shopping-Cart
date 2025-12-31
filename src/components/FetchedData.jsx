import { useEffect, useState } from 'react';

export default function UseData() {
	const [data, setData] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch('https://fakestoreapi.com/products', {
			headers: {
				'User-Agent': 'shopping-cart'
			}
		})
		.then(res => {
			if (!res.ok) throw new Error('Server error');
			return res.json()})
		.then(data => setData(data))
		.catch(error => setError(error))
		.finally(() => setLoading(false));
	}, []);

	return {data, error, loading}
}