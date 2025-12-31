import { useMemo, useState } from 'react';
import style from '../styles/Shop.module.css'
import { Link, useOutletContext } from 'react-router';

export default function Shop() {
	const { products, loading, error } = useOutletContext();
	const [ activeCategory, setActiveCategory ] = useState('all');
	const [ inputSearch, setInputSearch ] = useState('');

	const categories = useMemo(() => [
		{ label: "All", value: "all" },
		{ label: "Electronics", value: "electronics" },
		{ label: "Jewelery", value: "jewelery" },
		{ label: "Men clothing", value: "men's clothing" },
		{ label: "Women clothing", value: "women's clothing" },
	], []);

	const filteredProducts = useMemo(() => {
			let result = products;

			if (activeCategory !== 'all') {
				result = result.filter(p => p.category === activeCategory);
			}
				
			if (inputSearch.trim()) {
				result = result.filter(p => 
					p.title.toLowerCase().includes(inputSearch.trim().toLowerCase()));
			}

			return result;
  	}, [products, activeCategory, inputSearch]);

	return (
		<div className={style.shop}>
			<div className={style.categories}>
				<div className={style.buttons}>
					{categories.map(category => (
						<button
							key={category.value}
							onClick={() => {
								setActiveCategory(category.value);
								setInputSearch('');
							}}
							className={`${activeCategory === category.value ? style.active : ''} ${style.button}`}
						>{category.label}</button>
					))}
				</div>
				<div className={style.searchWrapper}>
					<input 
						type='text'
						placeholder='search...'
						className={style.input} 
						value={inputSearch} 
						onChange={(e) => setInputSearch(e.target.value)}
					/>
					<span className={style.searchIcon}></span>
				</div>
			</div>
			
			{loading ? <div className={style.loading}>
							<span></span>
							<p>Loading...</p>
						</div> :
			   error ? <div className={style.error}>
							<span></span>
							<p>A network error was encountered</p>
						</div> : (
				<div className={style.products}>
					{filteredProducts.map(product => (
						<Link to={`profile/${product.id}`} key={product.id}>
							<div className={style.product}>								
								<img src={product.image} alt="" className={style.img}/>																									
								<p className={style.price}>{product.price} $</p>
								<p>{product.title}</p> 	
								<span className={style.rating}>{product.rating.rate}</span>					
							</div>
						</Link>
					))}
				</div>
			)}
		</div>
	)
}