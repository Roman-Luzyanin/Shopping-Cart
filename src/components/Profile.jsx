import style from '../styles/Profile.module.css'
import { useState } from "react";
import { useParams, useOutletContext, useNavigate } from "react-router";
import ProfileCarousel from './ProfileCarousel';
import { useScreenWidth } from './Helper';

export default function Profile() {
	const [amount, setAmount] = useState(1);
	const [message, setMessage] = useState(false);
	const { id } = useParams();
	const { products, loading, error, cart, setCart } = useOutletContext();
	const navigate = useNavigate();

	const product = products.find(i => i.id === +id);

	const isAdded = cart.find(i => i.id === id);

	const addTOCart = () => {
		!isAdded ?
		setCart(prev => [...prev, { id, product, amount }]) :
		navigate('/cart');
	}

	const handleKeyDown = (e) => {
		if (!/[0-9]/.test(e.key) && 
			e.key !== 'Backspace' && 
			!e.key.startsWith('Arrow')) {
      		e.preventDefault(); 
    	}
	}

	const hadleAmount = (val) => {
		if (val === '0' || val > 10) {
			setMessage(true);
			setTimeout(() => setMessage(false), 2000);
			return;
		}
		setAmount(val);
	}

	const decrement = (val) => {
		if (val < 2) {
			setMessage(true);
			setTimeout(() => setMessage(false), 2000);
			return;
		}
		setAmount(val - 1);
	}
	const increment = (val) => {
		if (val > 9) {
			setMessage(true);
			setTimeout(() => setMessage(false), 2000);
			return;
		}
		setAmount(val + 1);
	}

	// -----------------------carousel-------------------------------
	const width = useScreenWidth();
	const visibleCount = width > 1100 ? 3 : width > 790 ? 2 : 1;
	const relatedProducts = products.filter(i => i.category === product.category && i.id !== product.id);
	const clonesBefore = relatedProducts.slice(-visibleCount).map(i => ({...i, id: '0' + i.id }));
	const clonesAfter = relatedProducts.slice(0, visibleCount).map(i => ({...i, id: '00' + i.id }));
	const extended = [...clonesBefore, ...relatedProducts, ...clonesAfter];

	return (
		<div className={style.profile}>
			{loading ? <div className={style.loading}>
							<span></span>
							<p>Loading...</p>
						</div> :
			   error ? <div className={style.error}>
							<span></span>
							<p>A network error was encountered</p>
						</div> : (
				<>
					<div className={style.description}>
						<div className={style.image}>
							<img src={product.image} alt="" />
						</div>

						<div className={style.productInfo}>
							<h2 className={style.title}>{product.title}</h2>
							<span className={style.price}>{product.price} $</span>
							<p className={style.text}>{product.description}</p>
							{!isAdded ? (
								<span className={style.inputWrapper}>
									<span className={style.quantity}>Quantity:</span>
									{message && <span className={style.message}>(min: 1 -- max: 10)</span>}
									<button className={style.minusBtn} onClick={() => decrement(amount)}></button>
									<input 
										type="number" 
										className={style.input}
										style={{display: isAdded && 'none'}}
										value={amount}
										onKeyDown={handleKeyDown}
										onChange={(e) => hadleAmount(e.target.value)} 
										onBlur={() => amount === '' && setAmount(1)}
										min='1' max='10'
									/> 
									<button className={style.plusBtn} onClick={() => increment(amount)}></button>
								</span>) : (
								<p className={style.added}>Added to the Cart</p>)}
							<button onClick={addTOCart} className={style.addButton}>	
								{!isAdded ? 'Add to Cart' : 'Go to Cart'}
							</button>
						</div>
					</div>	

					<hr className={style.hr}/>
					<ProfileCarousel products={extended} visibleCount={visibleCount}/>
				</>
			)}
		</div>
	)
}