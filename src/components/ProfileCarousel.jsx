import { Link } from 'react-router';
import { useEffect, useState } from 'react'
import style from '../styles/Profile.module.css'
import { useScreenWidth } from './Helper';

export default function ProfileCarousel({products, visibleCount}) {
	const [ index, setIndex ] = useState(visibleCount);
	const [ transition, setTransition ] = useState(true);
	const [ isAnimating, setIsAnimating ] = useState(false);
	const [ autoPlay, setAutoPlay ] = useState(true);

	const width = useScreenWidth();
	const slideWith = width > 480 ? 300 : 200;
	const gap = 25;
	const totalWidth = slideWith + gap;
	const TRANSITION_MS = 1000;

	const move = (dir) => {
		if (isAnimating) return;
		setIsAnimating(true);
		setIndex(i => i + dir);
		setTimeout(() => setIsAnimating(false), TRANSITION_MS);
	}

	useEffect(() => {
		if (index === products.length - visibleCount) {
			setTimeout(() => {
				setTransition(false);
				setIndex(visibleCount);
			}, TRANSITION_MS);
		}

		if (index === 0) {
			setTimeout(() => {
				setTransition(false);
				setIndex(products.length - visibleCount * 2);
			}, TRANSITION_MS);
		}

	}, [ index ]);
      
	useEffect(() => {
		if (!transition) {
			requestAnimationFrame(() =>{
				requestAnimationFrame(() => {
					setTransition(true);
				})
			})
		}
	}, [transition]);

	useEffect(() => {
		if (!autoPlay || isAnimating) return;
		const id = setInterval(() => move(1), 5000);
		return () => clearInterval(id);
	}, [ autoPlay, isAnimating ]);

	return (
		<div className={style.carousel}>
			<button 
				onClick={() => move(-1)}
				onPointerEnter={() => setAutoPlay(false)}
				onPointerLeave={() => setAutoPlay(true)}
			></button>

			<div 
				className={style.viewport} 
				style={{width: totalWidth * visibleCount + gap}}
				onPointerEnter={() => setAutoPlay(false)}
				onPointerLeave={() => setAutoPlay(true)}
			>
				<div style={{transform: `translateX(${-index * totalWidth}px)`, display: 'flex', gap,
							transition: transition ? `${TRANSITION_MS / 1000}s` : 'none'}}
				>									
					{products.map(product => (
						<Link to={`../shop/profile/${+product.id}`} key={product.id}>
						<div className={style.product}  style={{width: slideWith}}>
							<img src={product.image} alt="" className={style.img} />
							<p className={style.price}>{product.price} $</p>
							<p className={style.title}>{product.title}</p>
							<span className={style.rating}>{product.rating.rate}</span>	
						</div>
						</Link>
					))}
				</div>
			</div>

			<button 
				onClick={() => move(1)}
				onPointerEnter={() => setAutoPlay(false)}
				onPointerLeave={() => setAutoPlay(true)}
			></button>
		</div>
	)
}