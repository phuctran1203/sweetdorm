// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronRight, faLocationDot, faPhone, faXmark } from "@fortawesome/free-solid-svg-icons";
// style

import imgSlide1 from "./assets/slider/IMG_2149.jpg";
import imgSlide2 from "./assets/slider/IMG_2565.jpg";
import imgSlide3 from "./assets/slider/IMG_2567.jpg";
import imgSlide4 from "./assets/slider/IMG_4169.jpg";
import imgSlide5 from "./assets/slider/IMG_4629.jpg";
import imgSlide6 from "./assets/slider/IMG_6508.jpg";
import imgSlide7 from "./assets/slider/IMG_0563.jpg";
import imgSlide8 from "./assets/slider/IMG_5064.jpg";

import zalo_qr from "./assets/qr/zalo_ll.svg";
import fanpage_qr from "./assets/qr/fanpage_ll.svg";

import { useState, useEffect, useRef } from "react";
import "./scss/app.scss";
import animation from "./components/animation.module.scss";

const benefits = [
	"Giường tầng thoáng mát, ban công rộng rãi",
	"Wifi mỗi tầng",
	"Máy lạnh 24/24",
	"Camera an ninh 24/24, cửa khóa bằng vân tay",
	"Tủ quần áo, bàn ăn, máy giặt, máy sấy, máy lọc nước sạch cao cấp",
	"Có người dọn vệ sinh hàng tuần",
	"Nhà vệ sinh đầy đủ thiết bị, có sẵn nước nóng lạnh.",
	"Giờ giấc tự do",
];
function App() {
	const [isLoading, setIsLoading] = useState(true);

	const [currentSection, setCurrentSection] = useState("welcome");

	const imgSlides = useRef([imgSlide1, imgSlide2, imgSlide3, imgSlide4, imgSlide5, imgSlide6, imgSlide7, imgSlide8]);

	const [fullImg, setFullImg] = useState();

	const elemRefs = useRef([]);

	const autoAddElemRefs = (el) => {
		if (!el) return;
		elemRefs.current.push(el);
	};

	const handleScrollTo = (id) => {
		document.querySelector(`#${id}`).scrollIntoView({
			behavior: "smooth",
		});
	};

	const animateElems = useRef([]);

	const addElemToAnimate = (el) => {
		if (!el) return;
		el.classList.add(animation.prepare_slide_up);
		animateElems.current.push(el);
	};

	useEffect(() => {
		const callback = (entries) => {
			entries.forEach((entry) => {
				let el = entry.target;
				if (entry.isIntersecting) {
					setCurrentSection(el.id);
				}
			});
		};
		const options = {
			threshold: 0.2,
		};

		const observer = new IntersectionObserver(callback, options);

		elemRefs.current.forEach((el) => observer.observe(el));

		return () => {
			elemRefs.current.forEach((el) => observer.unobserve(el));
		};
	}, []);

	useEffect(() => {
		setIsLoading(false);
		const callback = (entries) => {
			let delay = 0;
			entries.forEach((entry) => {
				if (!entry.target.style.transitionDelay) {
					entry.target.style.transitionDelay = delay + "ms";
					delay += 50;
				}
				if (entry.isIntersecting) {
					entry.target.classList.add(animation.start_slide);
					observer.unobserve(entry.target);
				}
			});
		};
		const options = {
			threshold: 0.3,
		};

		const observer = new IntersectionObserver(callback, options);

		animateElems.current.forEach((el) => observer.observe(el));

		return () => {
			animateElems.current.forEach((el) => observer.unobserve(el));
		};
	}, []);

	return (
		<>
			{/* <div className={!isLoading ? "d-none" : "loading d-grid"} style={{ width: "100vw", height: "100vh" }}>
				<div className="spinner-border text-success m-auto" role="status">
					<span className="visually-hidden">Loading...</span>
				</div>
			</div> */}

			<header>
				<nav className="navbar navbar-expand-lg">
					<div className="container">
						<a className="navbar-brand d-flex align-items-center" href="#">
							<div className="rounded-circle brand-img">
								<img src="./Logo-Sweet-Dorm.png" alt="" />
							</div>
							<h5 className="ms-2 text-capitalize brand-name">sweet dorm</h5>
						</a>
						<button
							className="navbar-toggler"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#navcontent"
							aria-controls="navcontent"
							aria-expanded="false"
							aria-label="Toggle navigation"
						>
							<span className="navbar-toggler-icon"></span>
						</button>
						<div className="collapse navbar-collapse" id="navcontent">
							<ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-2">
								{["welcome", "about", "contact"].map((name) => (
									<li
										key={name}
										className={`nav-item px-2 ${name === currentSection ? "active" : ""}`}
										onClick={() => {
											document.querySelector(".navbar-collapse").classList.remove("show");
											handleScrollTo(name);
										}}
									>
										<button className="nav-link text-capitalize" aria-current="page">
											{name}
										</button>
									</li>
								))}
							</ul>
						</div>
					</div>
				</nav>
			</header>

			<div id="show-full" className={fullImg ? "" : "d-none"}>
				<div>
					<img src={fullImg} draggable={false} />
					<FontAwesomeIcon icon={faXmark} id="x-mark" onClick={() => setFullImg()} />
				</div>
			</div>

			<div className="container">
				{/* section welcome */}
				<div
					id="welcome"
					className="d-flex flex-column align-items-center justify-content-center"
					ref={(el) => autoAddElemRefs(el)}
				>
					<div className="">
						<div>
							<img src="./decor/green_paint_line.png" alt="" />
						</div>
						<h1 className="text-uppercase">welcome home</h1>
						<h5 className="fst-italic">Sweet shelter you are looking for</h5>
					</div>
					<div id="explore-more" className="mt-5">
						<button className="border-btn" onClick={() => handleScrollTo("about")}>
							Khám phá ngay
						</button>
						<div className="d-flex flex-column fs-3 mt-2 " onClick={() => handleScrollTo("about")}>
							<FontAwesomeIcon icon={faChevronDown} className={`${animation.infinite_jump}`} />
						</div>
					</div>
				</div>
				{/* section about */}
				<div id="about" ref={(el) => autoAddElemRefs(el)}>
					<div id="what-is" className="row align-items-center">
						<div className="col-lg-5 mb-5" ref={(el) => addElemToAnimate(el)} style={{ transitionDelay: "0ms" }}>
							<div className="mb-4">
								<h3 className="mb-3 fw-semibold" ref={(el) => addElemToAnimate(el)} style={{ transitionDelay: "60ms" }}>
									"Sweet Dorm" là gì?
								</h3>
								<p className="mb-2" ref={(el) => addElemToAnimate(el)} style={{ transitionDelay: "120ms" }}>
									"Sweet Dorm" là dịch vụ kí túc xá đem đến sự riêng tư tối đa.
								</p>
								<p ref={(el) => addElemToAnimate(el)} style={{ transitionDelay: "180ms" }}>
									Mang đến cho bạn một không gian sống thoải mái, cao cấp, chi phí phải chăng phù hợp với mọi đối tượng.
								</p>
							</div>
							<div ref={(el) => addElemToAnimate(el)} style={{ transitionDelay: "24ms" }}>
								<button className="fill-btn" onClick={() => handleScrollTo("service")}>
									Tiện ích cung cấp <FontAwesomeIcon icon={faChevronRight} />
								</button>
							</div>
						</div>
						<div className="col-lg-7">
							<div className="pc-show col-12 d-md-block d-none">
								<div>
									<img
										src="./decor/IMG_4168.jpg"
										className="col-12"
										alt=""
										ref={(el) => addElemToAnimate(el)}
										style={{ transitionDelay: "0ms" }}
									/>
								</div>
								<div>
									<img
										src="./decor/IMG_4167.jpg"
										className="col-12"
										alt=""
										ref={(el) => addElemToAnimate(el)}
										style={{ transitionDelay: "100ms" }}
									/>
								</div>
								<div>
									<img
										src="./decor/IMG_2564.jpg"
										className="col-12"
										alt=""
										ref={(el) => addElemToAnimate(el)}
										style={{ transitionDelay: "200ms" }}
									/>
								</div>
							</div>
							<div className="mb-show col-12 d-md-none d-block">
								<img
									src="./decor/IMG_4168.jpg"
									className="col-12"
									alt=""
									ref={(el) => addElemToAnimate(el)}
									style={{ transitionDelay: 0 }}
								/>
								<img
									src="./decor/IMG_4167.jpg"
									className="col-12 my-3"
									alt=""
									ref={(el) => addElemToAnimate(el)}
									style={{ transitionDelay: 0 }}
								/>
								<img
									src="./decor/IMG_2564.jpg"
									className="col-12"
									alt=""
									ref={(el) => addElemToAnimate(el)}
									style={{ transitionDelay: 0 }}
								/>
							</div>
						</div>
					</div>
					<div id="service">
						<div className="heading mx-auto mb-5" ref={(el) => addElemToAnimate(el)} style={{ transitionDelay: 0 }}>
							<div>
								<img src="./decor/green_paint_line.png" alt="" />
							</div>
							<h3 className="fw-semibold mb-3">Tiện ích có sẵn</h3>
						</div>
						<div className="row mx-0">
							{benefits.map((benefit) => (
								<div key={benefit} className="col-lg-3 col-md-4 col-6 pb-4" ref={(el) => addElemToAnimate(el)}>
									<div className="card" style={{ height: "130px" }}>
										<div className="icon">miễn phí</div>
										<div className="card-body mt-2 d-flex align-items-center justify-content-center text-center">
											{benefit}
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
					<div id="slider" className="mt-5">
						<div className="heading mx-auto mb-5" ref={(el) => addElemToAnimate(el)} style={{ transitionDelay: "0ms" }}>
							<div>
								<img src="./decor/green_paint_line.png" alt="" />
							</div>
							<h3 className="fw-semibold mb-3">Hình ảnh thực tế</h3>
						</div>
						<Swiper
							slidesPerView={1}
							spaceBetween={50}
							autoplay={{
								delay: 3500,
								disableOnInteraction: false,
							}}
							loop={true}
							pagination={{
								clickable: true,
								dynamicBullets: true,
							}}
							navigation={true}
							breakpoints={{
								320: {
									slidesPerView: 1,
									spaceBetween: 10,
								},
								640: {
									slidesPerView: 2,
									spaceBetween: 20,
								},

								1024: {
									slidesPerView: 3,
									spaceBetween: 40,
								},
							}}
							modules={[Autoplay, Pagination, Navigation]}
							className="mySwiper"
						>
							{imgSlides.current.map((img, index) => (
								<SwiperSlide className="acb" key={index}>
									<img src={img} draggable={false} />
									<div className="cover">
										<button className="fill-btn" onClick={() => setFullImg(img)}>
											<p>Xem</p>
										</button>
									</div>
								</SwiperSlide>
							))}
						</Swiper>
					</div>

					<div id="locate" className="mt-5">
						<div className="heading mx-auto mb-5" ref={(el) => addElemToAnimate(el)} style={{ transitionDelay: "0ms" }}>
							<div>
								<img src="./decor/green_paint_line.png" alt="" />
							</div>
							<h3 className="fw-semibold mb-3">Địa chỉ cơ sở</h3>
						</div>
						<div className="row">
							<div
								className="col-lg-6 col-12 mb-3"
								ref={(el) => addElemToAnimate(el)}
								style={{ transitionDelay: "0ms" }}
							>
								<p className="fw-bold text-uppercase">Cơ sở 1</p>

								<a
									className="ms-2"
									href="https://www.google.com/maps/place/358+X%C3%B4+Vi%E1%BA%BFt+Ngh%E1%BB%87+T%C4%A9nh,+Ph%C6%B0%E1%BB%9Dng+25,+B%C3%ACnh+Th%E1%BA%A1nh,+H%E1%BB%93+Ch%C3%AD+Minh,+Vi%E1%BB%87t+Nam/@10.8049278,106.7111706,17z/data=!4m6!3m5!1s0x317528bb4c9de4c7:0x76b3936036c31b9b!8m2!3d10.8038774!4d106.7115706!16s%2Fg%2F11csgpmlbs?entry=ttu"
								>
									<FontAwesomeIcon icon={faLocationDot} className="me-1" />
									358 Xô Viết Nghệ Tĩnh, Phường 25, Bình Thạnh, Hồ Chí Minh, Việt Nam
								</a>

								<iframe
									className="col-12 mt-2 rounded-2"
									height="400px"
									src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.0833544279035!2d106.71117057665114!3d10.804927803158789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528bb4c9de4c7%3A0x76b3936036c31b9b!2zMzU4IFjDtCBWaeG6v3QgTmdo4buHIFTEqW5oLCBQaMaw4budbmcgMjUsIELDrG5oIFRo4bqhbmgsIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1718626611112!5m2!1svi!2s"
									allowFullScreen=""
									loading="lazy"
									referrerPolicy="no-referrer-when-downgrade"
								></iframe>
							</div>

							<div className="col-lg-6 col-12" ref={(el) => addElemToAnimate(el)} style={{ transitionDelay: "50ms" }}>
								<p className="fw-bold text-uppercase">Cơ sở 2</p>
								<a
									className="ms-1"
									href="https://www.google.com/maps/place/23+%C4%90.+Nguy%E1%BB%85n+H%E1%BB%AFu+C%E1%BA%A3nh,+Ph%C6%B0%E1%BB%9Dng+22,+B%C3%ACnh+Th%E1%BA%A1nh,+H%E1%BB%93+Ch%C3%AD+Minh,+Vi%E1%BB%87t+Nam/@10.7904276,106.7139404,18z/data=!4m6!3m5!1s0x317528ace16b2a9f:0x10787caa2bf6cf7f!8m2!3d10.7900064!4d106.7149254!16s%2Fg%2F11knkdss8z?entry=ttu"
								>
									<FontAwesomeIcon icon={faLocationDot} className="me-1" />
									23 Đ. Nguyễn Hữu Cảnh, Phường 22, Bình Thạnh, Hồ Chí Minh, Việt Nam
								</a>

								<iframe
									className="col-12 mt-2 rounded-2"
									height="400px"
									src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1647.8511056229274!2d106.71394041960706!3d10.790427593765221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528ace16b2a9f%3A0x10787caa2bf6cf7f!2zMjMgxJAuIE5ndXnhu4VuIEjhu691IEPhuqNuaCwgUGjGsOG7nW5nIDIyLCBCw6xuaCBUaOG6oW5oLCBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1718626446831!5m2!1svi!2s"
									allowFullScreen=""
									loading="lazy"
									referrerPolicy="no-referrer-when-downgrade"
								></iframe>
							</div>
						</div>
					</div>
				</div>
				{/* contact */}
				<div id="contact" ref={(el) => autoAddElemRefs(el)}>
					<div className="heading mx-auto mb-5" ref={(el) => addElemToAnimate(el)} style={{ transitionDelay: "0ms" }}>
						<div>
							<img src="./decor/green_paint_line.png" alt="" />
						</div>
						<h3 className="fw-semibold mb-3">Thông tin liên hệ</h3>
					</div>
					<div className="row">
						<div className="mb-3 col-12 text-center">
							<a href="tel:0905035566" className="text-dark text-decoration-none fw-bold">
								<span className="me-1 fs-4">Số điện thoại:</span>
								<span className="ms-1 text-decoration-underline fs-4">0905035566</span>
							</a>
						</div>
						<div className="row">
							<div className="offset-md-2 col-md-4 col-6">
								<p className="text-center fw-semibold fs-3">ZALO</p>
								<img src={zalo_qr} alt="" />
							</div>
							<div className="col-md-4 col-6">
								<p className="text-center fw-semibold fs-3">FACEBOOK</p>
								<img src={fanpage_qr} alt="" />
							</div>
						</div>
					</div>
				</div>
			</div>

			<footer className="container mt-5">
				<p className="text-center my-4 opacity-50">Copyright &copy; 2024 - Phuc Tran TMPlate - All Rights Reserved</p>
			</footer>
		</>
	);
}

export default App;
