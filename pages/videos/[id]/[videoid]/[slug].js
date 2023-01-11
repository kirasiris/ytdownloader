import { useEffect, useState } from "react";
import { withRouter } from "next/router";
import Head from "next/head";
import axios from "axios";
// HELPERS
import Layout from "@/layout/Layout";
import FormJumbotron from "@/layout/FormJumbotron";
import SplitView from "@/layout/SplitView";

export const getServerSideProps = async (context) => {
	const params = `?sort=-createdAt`;
	const videos = await axios.get(`/extras/youtube${params}`);
	const totalPages = videos?.data.pagination?.totalpages || 0;
	const totalResults = videos?.data.count || 0;
	const page = videos?.data.pagination?.current || 1;
	const next = videos?.data.pagination?.next?.page || 0;
	const prev = videos?.data.pagination?.prev?.page || 0;
	const paramsObject = context.query;
	const video = await axios.get(
		`/extras/youtube/${context.params.id}/${context.params.videoid}`
	);

	if (!video.data.data) {
		return { notFound: true };
	}

	return {
		props: {
			params: params,
			serverVideos: videos?.data?.data || [],
			totalDocuments: videos?.data?.countAll || 0,
			totalPages: totalPages,
			totalResults: totalResults,
			page: page,
			next: next,
			prev: prev,
			paramsObject: paramsObject,
			video: video?.data?.data || null,
		},
	};
};

const Video = ({ serverVideos, router, video }) => {
	const [myVideo, setMyVideo] = useState(null);
	const [videos, setVideos] = useState(serverVideos);

	useEffect(() => {
		setVideos(serverVideos);
	}, [router]);

	return (
		<Layout
			title={`${video.title}`}
			description={`${video.text}`}
			author={`${video.author.name}`}
			sectionClass={`mb-3`}
			containerClass={`container`}
			url={`videos/${video._id}/${video.videoId}/${video.slug}`}
			posType={`post`}
			createdAt={`${video.createdAt}`}
			updatedAt={`${video.updatedAt}`}
			postImage={`${video.thumbnails[video.thumbnails.length - 1]}`}
		>
			<Head>
				{video.keywords.length > 0 &&
					video.keywords.map((keyword, index) => (
						<meta property={`article:tag`} key={index} content={`${keyword}`} />
					))}
			</Head>
			<FormJumbotron
				setObject={setMyVideo}
				setObjects={setVideos}
				objects={videos}
			/>
			<SplitView myVideo={myVideo} video={video} objects={videos} />
		</Layout>
	);
};

export default withRouter(Video);
