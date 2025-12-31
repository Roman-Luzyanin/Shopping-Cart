import style from '../styles/Home.module.css'
import { Link } from 'react-router'
import RunningLine from './RunningLine'
import Carousel from './HomeCarousel'

export default function Home() {
	return (
		<div className={style.home}>
			<div className={style.banner}>
				<Link to='shop'
					className={style.shopBtn}
				>NOW</Link>
				<div className={style.bannerImg}></div>
			</div>
			<RunningLine />
			<Carousel />
		</div>
	)
}