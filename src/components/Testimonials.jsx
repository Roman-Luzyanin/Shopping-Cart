import img1 from '../assets/Person_1.png';
import img2 from '../assets/Person_2.png';
import img3 from '../assets/Person_3.png';

const testimonials = [
	{
		img: img1,
		name: "Kate Rogers",
		position: "Graphic Designer",
		title: "AMAZING CUSTOMER SERVICE",
		text: "Graphic design, and web development as a placeholder to visually demonstrate a layout's appearance before actual content is available, focusing attention on design elements like fonts and spacing rather than distracting.",
	},
	{
		img: img2,
		name: "David Smith",
		position: "Marketing Director",
		title: "TRULY EXCEPTIONAL CARE",
		text: "Graphic design, and web development as a placeholder to visually demonstrate a layout's appearance before actual content is available, focusing attention on design elements like fonts and spacing rather than distracting.",
	},
	{
		img: img3,
		name: "Larissa Grant",
		position: "Brand Manager",
		title: "HIGHLY RECOMMEND",
		text: "Graphic design, and web development as a placeholder to visually demonstrate a layout's appearance before actual content is available, focusing attention on design elements like fonts and spacing rather than distracting.",
	},
]

const visibleCount = 1;
const clonesBefore = testimonials.slice(-visibleCount);
const clonesAfter = testimonials.slice(0, visibleCount);
const extended = [...clonesBefore, ...testimonials, ...clonesAfter];

export default extended;