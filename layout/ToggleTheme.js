import { useEffect, useState } from "react";

const ToggleTheme = () => {
	const [appearanceData, setAppearanceData] = useState({
		themeColor: "ligth-mode",
	});

	let { themeColor } = appearanceData;

	useEffect(() => {
		const newColor = localStorage.getItem("themeColor");
		if (newColor !== undefined && newColor !== null) {
			document.body.classList.add(newColor);
			setAppearanceData({
				themeColor: newColor,
			});
		}
	}, []);

	const toggleTheme = (color) => {
		if (color === "dark-mode") {
			localStorage.setItem("themeColor", color);
			document.body.classList.remove(`ligth-mode`);
			document.body.classList.add(`${color}`);
			setAppearanceData({
				themeColor: color,
			});
		}
		if (color === "ligth-mode") {
			localStorage.setItem("themeColor", color);
			document.body.classList.remove(`dark-mode`);
			document.body.classList.add(`${color}`);
			setAppearanceData({
				themeColor: color,
			});
		}
	};

	return (
		<span
			style={{ fontSize: "24px" }}
			onClick={() =>
				toggleTheme(themeColor === "ligth-mode" ? "dark-mode" : "ligth-mode")
			}
		>
			{themeColor === `ligth-mode` ? <>🌞</> : <>🌕</>}
		</span>
	);
};

export default ToggleTheme;
