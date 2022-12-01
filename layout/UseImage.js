const UseImage = ({
	src = ``,
	alt = ``,
	idGiven = ``,
	classGiven = `img-fluid`,
	width = ``,
	height = ``,
	style,
	props,
}) => {
	return (
		<img
			src={`${src}`}
			alt={`${alt}`}
			id={`${idGiven}`}
			className={`${classGiven}`}
			width={`${width}`}
			height={`${height}`}
			loading={`lazy`}
			style={style}
		/>
	);
};
export default UseImage;
