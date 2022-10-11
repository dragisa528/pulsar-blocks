import {
	useBlockProps,
	useInnerBlocksProps,
	BlockControls,
} from "@wordpress/block-editor";

import { useState, useEffect } from "@wordpress/element";

import CarouselControls from "./components/CarouselControls";

import Splide from "@splidejs/splide";

import { dispatch, select } from "@wordpress/data";

import {
	DropdownMenu,
	Toolbar,
	ToolbarItem,
	MenuGroup,
	MenuItem,
	Dropdown,
	Button,
} from "@wordpress/components";

import { createBlock } from "@wordpress/blocks";

import { more, plus } from "@wordpress/icons";

import "./editor.scss";

const ALLOWED_BLOCKS = ["pulsar/carousel-slide"];

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @param {Object}   param0
 * @param {Object}   param0.clientId
 * @param {Object}   param0.attributes
 * @param {Function} param0.setAttributes
 * @return {WPElement} Element to render.
 *
 *
 */

export default function Edit({ clientId, attributes, setAttributes }) {
	const {
		mediaQuery,
		autoplay,
		arrows,
		pagination,
		type,
		mobileOptions,
		tabletOptions,
		desktopOptions,
	} = attributes;

	const [carousel, setCarousel] = useState({});

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

	/**
	 * Transform FocusType and FocusPosition into
	 * a single key 'focus' for each breakpoint screen
	 * https://splidejs.com/guides/options/#focus
	 */
	const transformFocusType = () => {
		const mobile = { ...mobileOptions };
		mobile.focus =
			mobile.focusType === "number"
				? mobile.focusPosition
				: mobile.focusType;
		delete mobile.focusPosition;
		delete mobile.focusType;

		const tablet = { ...tabletOptions };
		tablet.focus =
			tablet.focusType === "number"
				? tablet.focusPosition
				: tablet.focusType;
		delete tablet.focusPosition;
		delete tablet.focusType;

		const desktop = { ...desktopOptions };
		desktop.focus =
			desktop.focusType === "number"
				? desktop.focusPosition
				: desktop.focusType;
		delete desktop.focusPosition;
		delete desktop.focusType;

		return { desktop, tablet, mobile };
	};

	const focusPositions = transformFocusType();
	const [splideJSONData, setSplideJSONData] = useState({
		mediaQuery,
		autoplay,
		arrows,
		pagination,
		type,
		breakpoints: {
			640: focusPositions.mobile,
			1024: focusPositions.tablet,
			1280: focusPositions.desktop,
		},
		//trimSpace: false,
	});

	useEffect(() => {
		if (Object.keys(carousel).length === 0) {
			const splide = new Splide(`#block-${clientId}`, splideJSONData);
			setCarousel(splide.mount());
			return;
		}
		carousel.destroy(false); //Only works if you pass in false. Passing in true prevents you from focusing on the carousel.
		carousel.options = splideJSONData;
		carousel.mount();
	}, [splideJSONData]);

	useEffect(() => {
		const breakpoints = transformFocusType();
		setSplideJSONData({
			...splideJSONData,
			breakpoints: {
				640: breakpoints.mobile,
				1024: breakpoints.tablet,
				1280: breakpoints.desktop,
			},
		});
	}, [desktopOptions, mobileOptions, tabletOptions]);

	let ALLOWED_INNER_BLOCKS = [];

	const [blocks, setBlocks] = useState(null);
	useEffect(() => {
		ALLOWED_INNER_BLOCKS = select("core/block-editor")
			.getInserterItems(clientId)
			.map((item) => {
				return {
					id: item.id,
					title: item.title,
					icon: more,
					onClick: () => addBlock(item.id),
				};
			});
		setBlocks(ALLOWED_INNER_BLOCKS);
	}, []);

	const addBlock = (id) => {
		const innerBlocks =
			select("core/editor").getBlocksByClientId(clientId)[0].innerBlocks;
		const block = createBlock(id);
		dispatch("core/editor").insertBlock(
			block,
			innerBlocks.length,
			clientId
		);
	};

	const blockProps = useBlockProps({ className: "splide__list" });

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		orientation: "horizontal",
		allowedBlocks: ALLOWED_BLOCKS,
		renderAppender: () => (
			<Dropdown
				className=""
				contentClassName=""
				position="bottom right"
				renderToggle={({ isOpen, onToggle, onClose }) => (
					<Button isPrimary onClick={onToggle} aria-expanded={isOpen}>
						Add slide
					</Button>
				)}
				renderContent={({ isOpen, onToggle, onClose }) => (
					<MenuGroup>
						{blocks.map((block, index) => (
							<MenuItem
								key={index}
								icon={more}
								onClick={() => addBlock(block.id)}
							>
								{block.title}
							</MenuItem>
						))}
					</MenuGroup>
				)}
			/>
		),
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
				{...useBlockProps({ className: "splide" })}
				aria-label=""
				/*data-splide={JSON.stringify(splideJSONData)}*/
			>
				<div className="splide__track">
					<ul {...innerBlocksProps}></ul>
				</div>
			</div>
			<BlockControls>
				<DropdownMenu
					icon={plus}
					label="Select a direction"
					controls={blocks}
				/>
			</BlockControls>
		</>
	);
}
