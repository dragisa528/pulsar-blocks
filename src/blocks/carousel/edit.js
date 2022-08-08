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
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

import { useState, useEffect } from '@wordpress/element';

import CarouselControls from './components/CarouselControls';

import Splide from '@splidejs/splide';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

const ALLOWED_BLOCKS = ['pulsar-toolkit/carousel-slide'];
const TEMPLATE = [
	['pulsar-toolkit/carousel-slide'],
	['pulsar-toolkit/carousel-slide'],
	['pulsar-toolkit/carousel-slide'],
	['pulsar-toolkit/carousel-slide'],
];

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @param {Object}   param0
 * @param {Object}   param0.clientId
 * @param {Object}   param0.attributes
 * @param {Function} param0.setAttributes
 * @return {WPElement} Element to render.
 */
export default function Edit({ clientId, attributes, setAttributes }) {
	const {
		autoplay,
		arrows,
		pagination,
		type,
		mobileOptions,
		tabletOptions,
		desktopOptions,
	} = attributes;

	const [splideJSONData, setSplideJSONData] = useState({
		autoplay,
		arrows,
		pagination,
		type,
	});

	const onChangeAutoplayEnabled = () => {
		setAttributes({ autoplay: !autoplay });
		setSplideJSONData({ ...splideJSONData, autoplay: !autoplay });
	};

	const onChangeArrowsEnabled = () => {
		setAttributes({ arrows: !arrows });
		setSplideJSONData({ ...splideJSONData, arrows: !arrows });
	};

	const onChangePaginationEnabled = () => {
		setAttributes({ pagination: !pagination });
		setSplideJSONData({ ...splideJSONData, pagination: !pagination });
	};

	const onChangeAnimationMode = (mode) => {
		setAttributes({ type: mode });
		setSplideJSONData({ ...splideJSONData, type: mode });
	};

	const onChangeMobileAttributes = (object) => {
		setAttributes({ mobileOptions: object });
	};

	const onChangeTabletAttributes = (object) => {
		setAttributes({ tabletOptions: object });
	};

	const onChangeDesktopAttributes = (object) => {
		setAttributes({ desktopOptions: object });
	};

	const refreshCarousel = () => {
		carousel.refresh();
		setCarouselNeedsRefresh(!carouselNeedsRefresh);
	};

	const [carouselNeedsRefresh, setCarouselNeedsRefresh] = useState(false);
	const [isInitialLoad, setInitialLoad] = useState(true);

	useEffect(() => {
		const mobile = { ...mobileOptions };
		mobile.focus =
			mobile.focusType === 'number'
				? mobile.focusPosition
				: mobile.focusType;
		delete mobile.focusPosition;
		delete mobile.focusType;

		const tablet = { ...tabletOptions };
		tablet.focus =
			tablet.focusType === 'number'
				? tablet.focusPosition
				: tablet.focusType;
		delete tablet.focusPosition;
		delete tablet.focusType;

		const desktop = { ...desktopOptions };
		desktop.focus =
			desktop.focusType === 'number'
				? desktop.focusPosition
				: desktop.focusType;
		delete desktop.focusPosition;
		delete desktop.focusType;

		setSplideJSONData({
			...splideJSONData,
			breakpoints: {
				640: mobile,
				1024: tablet,
				1280: desktop,
			},
		});
	}, [carouselNeedsRefresh, desktopOptions, mobileOptions, tabletOptions]);

	useEffect(() => {
		const carousel = new Splide(`#block-${clientId}`).mount();
		setInitialLoad(false);
	}, [isInitialLoad]);

	const blockProps = useBlockProps({ className: 'splide__list' });

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		orientation: 'horizontal',
		template: TEMPLATE,
		allowedBlocks: ALLOWED_BLOCKS,
	});

	return (
		<>
			<CarouselControls
				autoplay={autoplay}
				arrows={arrows}
				pagination={pagination}
				type={type}
				mobileOptions={mobileOptions}
				tabletOptions={tabletOptions}
				desktopOptions={desktopOptions}
				onChangeAutoplayEnabled={onChangeAutoplayEnabled}
				onChangeArrowsEnabled={onChangeArrowsEnabled}
				onChangePaginationEnabled={onChangePaginationEnabled}
				onChangeAnimationMode={onChangeAnimationMode}
				onChangeMobileAttributes={onChangeMobileAttributes}
				onChangeTabletAttributes={onChangeTabletAttributes}
				onChangeDesktopAttributes={onChangeDesktopAttributes}
			/>
			<div
				{...useBlockProps({ className: 'splide' })}
				aria-label=""
				data-splide={JSON.stringify(splideJSONData)}
			>
				<div className="splide__track">
					<ul {...innerBlocksProps}></ul>
				</div>
			</div>
		</>
	);
}
