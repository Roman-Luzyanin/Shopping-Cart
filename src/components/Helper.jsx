import style from '../styles/App.module.css'
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router';

export function Hamburger({cart, isMobile, login, setLogin}) {
	const [ open, setOpen ] = useState(false);

	useEffect(() => {
		if (!isMobile && open) setOpen(false);
	}, [isMobile, open]);

	useEffect(() => {
	function handleClickOutside(e) {
		if (open && !e.target.closest(`.${style.hamMenu}`) &&
			!e.target.closest(`.${style.hamBtn}`)) {
		setOpen(false);
		}
	}
	document.addEventListener('mousedown', handleClickOutside);
	
	return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [open]);

	return (
		<div className={style.hamburger}>
			<button className={`${style.hamBtn} ${open ? style.close : style.open}`} onClick={() => setOpen(prev => !prev)}></button>

			<AnimatePresence>
				{open && (
					<motion.div 
						className={style.hamMenu}
						initial={{opacity: 0, y: -20}}
						animate={{opacity: 1, y: 0}}
						exit={{opacity: 0}}
					>
						<NavLink to='/' end
							className={({isActive}) => isActive ? style.active : ''}
							onClick={() => setOpen(false)}
						>Home</NavLink>
						<NavLink to='shop'
							className={({isActive}) => isActive ? style.active : ''}
							onClick={() => setOpen(false)}
						>Shop</NavLink>	
						<NavLink to='cart' 
							className={({isActive}) =>
								`${cart.length ? style.indicator : ''} ${isActive ? style.active : ''}`}
							onClick={() => setOpen(false)}
						>Cart</NavLink>

						<div className={style.hamAutorization} onClick={() => setLogin(!login)}>
							{!login ? 
							<div className={style.login}></div> :
							<div className={style.profile}></div>
							}
						</div>	
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}


export function useScreenWidth() {
	const [width, setWidth] = useState(() => window.innerWidth);

	useEffect(() => {
		const handleResize = () => setWidth(window.innerWidth);
		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return width;
}