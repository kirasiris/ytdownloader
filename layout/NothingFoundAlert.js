// ACTIONS
// HELPERS

// REACTBOOTSTRAP
import Alert from "react-bootstrap/Alert";

const NothingFoundAlert = ({
	variante = `danger`,
	classStr = ``,
	alertText = `Nothing found`,
}) => {
	return (
		<Alert variant={variante} className={`${classStr}`}>
			{alertText}
		</Alert>
	);
};

export default NothingFoundAlert;
