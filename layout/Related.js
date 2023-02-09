/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Related = ({ related }) => {
	const responsive = {
		superLargeDesktop: {
			// the naming can be any, depends on you.
			breakpoint: { max: 4000, min: 3000 },
			items: 5,
		},
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 3,
		},
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: 1,
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 1,
		},
	};
	return (
		related?.length > 0 && (
			<>
				<h6>Related ({related.length})...</h6>
				<Carousel responsive={responsive}>
					{related.map((related, index) => (
						<div key={index}>
							<a
								href={`https://www.youtube.com/watch?v=${related.id}`}
								target="_blank"
								rel="noreferrer noopener"
							>
								<img
									key={related.id}
									src={related.thumbnails[related.thumbnails.length - 1].url}
									alt={`${related}'s thumbnail`}
									title="imagem"
									style={{
										width: 400,
										height: "auto",
									}}
									className="p-1"
								/>
							</a>
							<br />
							{related.author && (
								<>
									<a
										href={related.author.channel_url}
										target="_blank"
										rel="noreferrer noopener"
									>
										<img
											src={
												related.author.thumbnails[
													related.author.thumbnails.length - 1
												].url
											}
											style={{ width: "45px" }}
											className="mt-2 mb-1"
										/>{" "}
										{related.author.name}
									</a>
									<br />
								</>
							)}

							<a
								href={`https://www.youtube.com/watch?v=${related.id}`}
								target="_blank"
								rel="noreferrer noopener"
							>
								{related.title}
							</a>
						</div>
					))}
				</Carousel>
			</>
		)
	);
};

export default Related;
