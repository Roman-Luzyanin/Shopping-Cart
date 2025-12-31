import style from '../styles/App.module.css'
import UseData from './FetchedData';
import { Outlet, NavLink, useLocation } from 'react-router'
import { useEffect, useState } from 'react'
import { useScreenWidth, Hamburger } from './Helper';

export default function ShoppingCart() {
	const [ login, setLogin ] = useState(false);
	const { data: products, loading, error } = UseData();
	const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);	

	const location = useLocation();
	const width = useScreenWidth();
	const isMobile = width < 641;

	useEffect(() => localStorage.setItem('cart', JSON.stringify(cart)), [cart]);

	return (
		<div className={style.app}>
			<div className={style.header}>
				<div className={style.logo}></div>
		
				{isMobile ? (
					<Hamburger cart={cart} isMobile={isMobile} login={login} setLogin={setLogin}/>
				) : (
					<div className={style.menu} >															
						<NavLink to='/' end
							className={({isActive}) => isActive ? style.active : ''}
						>Home</NavLink>
						<NavLink to='shop'
							className={({isActive}) => isActive ? style.active : ''}
						>Shop</NavLink>	
						<NavLink to='cart' 
							className={({isActive}) =>
								`${cart.length ? style.indicator : ''} ${isActive ? style.active : ''}`}
						>Cart</NavLink>
					</div>
				)}
				
				<div className={style.autorization} onClick={() => setLogin(!login)}>
					{!login ? 
					<div className={style.login}></div> :
					<div className={style.profile}></div>
					}
				</div>								
			</div>
			<div className={style.main}>
				<Outlet 
					context={{
						products,
						loading,
						error,
						cart,
						setCart
					}}
				/>
			</div>
			<div className={style.footer} style={{flex: location.pathname === '/' && 1000}}>
				<div className={style.footerInner}>
					<div className={style.logo}></div>
					<p className={style.openingHours_1}>WE ARE OPEN 24 HOURS</p>
					<p className={style.openingHours_2}>OPEN 24/7</p>
					<div className={style.socials}>
						<button className={style.facebook}></button>
						<button className={style.instagram}></button>
						<button className={style.twitter}></button>
					</div>					
				</div>
				<hr />
				<p className={style.bottom}>&#169; All rights reserved, but that is not for sure, 2025.</p>
			</div>
		</div>
		
	)
}