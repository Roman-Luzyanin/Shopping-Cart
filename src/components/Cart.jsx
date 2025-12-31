import { useState } from 'react';
import style from '../styles/Cart.module.css'
import { useOutletContext } from 'react-router'

export default function Cart() {
	const { cart, setCart } = useOutletContext();
	const [message, setMessage] = useState(false);

	if (!cart.length) return <div className={style.empty}>
								<span></span>
								<p>Your cart is empty</p>
							 </div>;

	const handleAmount = (id, val) => {
		if (val === '0' || val > 10) {
			setMessage(id);
			setTimeout(() => setMessage(false), 2000);
			return;
		}
		setCart(prev => prev.map(i => i.id === id ? {...i, amount: val} : i));
	}

	const userCorrection = (id, val) => {
		if (val === '') {
			setCart(prev => prev.map(i => i.id === id ? {...i, amount: 1} : i));
		}
	}

	const handleKeyDown = (e) => {
		if (!/[0-9]/.test(e.key) && 
			e.key !== 'Backspace' && 
			!e.key.startsWith('Arrow')) {
      		e.preventDefault(); 
    	}
	}

	const decrement = (id, val) => {
		if (val < 2) {
			setMessage(id);
			setTimeout(() => setMessage(false), 2000);
			return;
		}
		setCart(prev => prev.map(i => i.id === id ? {...i, amount: val - 1} : i));
	}
	const increment = (id, val) => {
		if (val > 9) {
			setMessage(id);
			setTimeout(() => setMessage(false), 2000);
			return;
		}
		setCart(prev => prev.map(i => i.id === id ? {...i, amount: +val + 1} : i));
	}

	const handleRemove = (id) => setCart(prev => prev.filter(i => i.id !== id));
		
	return (
		<div className={style.cart}>
			{cart.map(item => (
				<div key={item.id} className={style.product}>
					<img src={item.product.image} alt="" className={style.image}/>
					<p className={style.title}>{item.product.title}</p>
					<p className={style.price}>{item.product.price} $</p>
					<div className={style.input}>
						{message === item.id && <p className={style.message}>(min: 1 -- max: 10)</p>}
						<button className={style.minusBtn} onClick={() => decrement(item.id, item.amount)}></button>
						<input 
							type="number" 
							value={item.amount} 
							onKeyDown={handleKeyDown}
							onChange={(e) => handleAmount(item.id, e.target.value)}
							onBlur={(e) => userCorrection(item.id, e.target.value)}
							min='1' max='10'
						/>
						<button className={style.plusBtn} onClick={() => increment(item.id, item.amount)}></button>
					</div>
					<button className={style.remove} onClick={() => handleRemove(item.id)}></button>
				</div>
			))}
			<div className={style.totalWrapper}>
				<span className={style.total}>Total: {cart.map(i => i.product.price * i.amount)
								.reduce((i,acc) => i + acc, 0)
									.toFixed(2)} $</span>
			</div>
		</div>
	)
}