/**
 * useBlockProps is a React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 *
 * RichText is a component that allows developers to render a contenteditable input,
 * providing users with the option to format block content to make it bold, italics,
 * linked, or use other formatting.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/richtext/
 */
import { useBlockProps, RichText } from "@wordpress/block-editor";
import { useSelect } from "@wordpress/data";
import { __ } from "@wordpress/i18n";
import CarouselControls from "./components/CarouselControls";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @param {Object}   param0
 * @param {Object}   param0.attributes
 * @param {string}   param0.attributes.message
 * @param {Function} param0.setAttributes
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const {
		slidesPerPage,
		slidesPerMove,
		isAutoplayEnabled,
		isShowArrowsEnabled,
		isPaginationEnabled,
		animationMode,
		slideGap,
		focusPosition,
		focusType,
	} = attributes;

	const onChangeAutoplayEnabled = () => {
		setAttributes({ isAutoplayEnabled: !isAutoplayEnabled });
	};

	const onChangeArrowsEnabled = () => {
		setAttributes({ isShowArrowsEnabled: !isShowArrowsEnabled });
	};

	const onChangePaginationEnabled = () => {
		setAttributes({ isPaginationEnabled: !isPaginationEnabled });
	};

	const onChangeAnimationMode = (mode) => {
		setAttributes({ animationMode: mode });
	};

	const onChangeSlidesPerPage = (number) => {
		setAttributes({ slidesPerPage: number });
	};

	const onChangeSlidesPerMove = (number) => {
		setAttributes({ slidesPerMove: number });
	};

	const onChangeSlideGap = (number) => {
		setAttributes({ slideGap: number });
	};

	const onChangeFocusType = (type) => {
		setAttributes({ focusType: type });
	};

	const onChangeFocusPosition = (position) => {
		setAttributes({ focusPosition: position });
	};

	return (
		<>
			<CarouselControls
				slidesPerPage={slidesPerPage}
				slidesPerMove={slidesPerMove}
				isAutoplayEnabled={isAutoplayEnabled}
				isShowArrowsEnabled={isShowArrowsEnabled}
				isPaginationEnabled={isPaginationEnabled}
				animationMode={animationMode}
				slideGap={slideGap}
				focusPosition={focusPosition}
				focusType={focusType}
				onChangeAutoplayEnabled={onChangeAutoplayEnabled}
				onChangeArrowsEnabled={onChangeArrowsEnabled}
				onChangePaginationEnabled={onChangePaginationEnabled}
				onChangeAnimationMode={onChangeAnimationMode}
				onChangeSlidesPerPage={onChangeSlidesPerPage}
				onChangeSlidesPerMove={onChangeSlidesPerMove}
				onChangeSlideGap={onChangeSlideGap}
				onChangeFocusType={onChangeFocusType}
				onChangeFocusPosition={onChangeFocusPosition}
			/>
		</>
	);
}
