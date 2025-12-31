import style from '../styles/Home.module.css'
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import extended from './Testimonials';
import { useScreenWidth } from './Helper';

//testimonials have 5 items for carousel
const dots = [1, 2, 3]

export default function HomeCarousel() {
	const [ index, setIndex ] = useState(1);
	const [ autoPlay, setAutoPlay ] = useState(true);
	const [ animate, setAnimate ] = useState(true);
	const [ isAnimating, setIsAnimating ] = useState(false);

	const width = useScreenWidth();
	const slideWidth = width > 760 ? 700 : width > 540 ? 520 : 300;	

	useEffect(() => {
		if (!autoPlay) return;
		const id = setInterval(() => move(1), 5000);	
		return () => clearInterval(id);
	}, [ autoPlay ]);

	const move = (dir) => {
		if (isAnimating) return;
		setIsAnimating(true);
		setIndex(i => i + dir);
	}
		
	const jump = () => {
		if (index === extended.length - 1) {
			setAnimate(false);
			setIndex(1);
		}

		if (index === 0) {
			setAnimate(false);
			setIndex(extended.length - 2);
		}

		setIsAnimating(false);
	}

	const update = () => {
		if (!animate) setAnimate(true);
	}

	const dotIndex = index === 0 ? dots.length : index === extended.length - 1 ? 1 : index;

	useEffect(() => {
		const handleVisibility = () => {
			setAutoPlay(!document.hidden);
		};

		document.addEventListener('visibilitychange', handleVisibility);
		return () => document.removeEventListener('visibilitychange', handleVisibility);
	}, []);
		
	return (
		<div className={style.carousel}>
			{/* <button onClick={() => move(-1)}>prev</button> */}
			<div 
				className={style.viewport}
				style={{ width: slideWidth }}
				onMouseEnter={() => setAutoPlay(false)}
				onMouseLeave={() => setAutoPlay(true)}
			>
				<motion.div 
					style={{display: 'flex'}}
					animate={{ x: -index * slideWidth }}
					transition={animate ? {duration: 1} : {duration: 0}}
					onAnimationComplete={jump}
					onUpdate={update}
				>
					{extended.map((item, i) => (
						<div key={i} className={style.testimonial} style={{width: slideWidth}}>
							<div className={style.image}>
								<img src={item.img} />
							</div>
							<div className={style.description}>
								<span>{item.name} </span>- 
								<span className={style.position}> {item.position}</span>
								<span className={style.stars}></span>
								<p className={style.title}>{item.title}</p>
								<p className={style.text}>{item.text}</p>
							</div>
						</div>
					))}
				</motion.div>

				<div className={style.dots} style={{opacity: !isAnimating ? 1 : 0}}>
					{dots.map((_, i) => (
						<span
							key={i}
							className={`${style.dot} ${dotIndex === i + 1 ? style.active : ''}`}
							onClick={() => {
								setIndex(i + 1);
								setIsAnimating(true);
							}}
						></span>
					))}
				</div>
			</div>
			{/* <button onClick={() => move(1)}>next</button> */}
		</div>
	)
}