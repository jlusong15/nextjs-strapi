import Image from "next/image"

export default function Home() {
	return (
		<>
			<section
				id="home"
				className="h-[calc(100vh)] bg-cover bg-right flex items-center justify-end"
				style={{
					backgroundImage: "url('/images/home.jpg')",
				}}
			>
				<div className="h-[calc(100vh)] w-full px-8 flex items-center justify-end bg-linear-to-l from-black/80 to-transparent">
					<div className="w-full max-w-xl text-center sm:text-right opacity-0 animate-[fadeIn_1s_ease-out_forwards]">
						<span className="text-xl sm:text-4xl md:text-6xl font-bold mb-4 text-white">Hello World!</span>
						<p className="text-sm sm:text-lg md:text-lg text-gray-200">
							This is Jennifer Bautista's test app built on React Next.js + Strapi (PostgreSQL) + Stripe for Payment
						</p>
						<a
							href="#about-me"
							className="cursor-pointer inline-block mt-6 px-6 py-3 bg-white text-primary rounded-md hover:text-white hover:bg-gray-500 transition"
						>
							About Me
						</a>
					</div>
				</div>
			</section>
			<section
				id="about-me"
				className="h-[calc(100vh)] bg-cover bg-left flex items-center px-8 bg-gray-200"
				style={{
					backgroundImage: "url('/images/about.jpg')",
				}}
			>
				<div className="max-w-xl text-center sm:text-left opacity-0 animate-[fadeIn_1s_ease-out_forwards]">
					<Image
						src="/images/jenna.jpg"
						alt="Jenna"
						width={150}
						height={150}
						className="rounded-[100%] mb-2 m-auto sm:m-0"
						loading="lazy"
					/>
					<h1 className="text-xl sm:text-2xl text-primary">Jennifer Bautista</h1>
					<h2 className="text-sm sm:text-lg text-secondary-foreground">
						Frontend Developer | Software Engineer | UI/UX Developer
					</h2>
					<h3 className="text-sm sm:text-lg text-gray-500">Angular • React</h3>
					<p className="text-xs sm:text-lg">
						Motivated Frontend Developer with 15+ years of experience in frontend development and UI/UX, including 9+
						years building scalable, user-centric web applications using React and Angular. Experienced in agile
						development, collaborating with cross-functional teams, and delivering high-performance, maintainable code.
					</p>
				</div>
			</section>
		</>
	)
}
