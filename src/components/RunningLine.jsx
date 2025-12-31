import style from '../styles/Home.module.css'

const modules = import.meta.glob('../assets/logos/*.png', {
	eager: true,
});

const blob = Object.values(modules).map(mod => mod.default);

const logos = Array.from({ length: 10 }, (_, i) => (blob[i]));

export default function RunningLine() {
	return (
		<div className={style.marquee}>
			<div className={style.track}>
				{logos.map((src, i) => (
					<img key={i} src={src} alt="" />
				))}
			</div>
			<div className={style.track}>
				{logos.map((src, i) => (
					<img key={i} src={src} alt="" />
				))}
			</div>
		</div>
	)
} 