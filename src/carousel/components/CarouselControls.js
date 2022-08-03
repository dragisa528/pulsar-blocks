import { InspectorControls } from "@wordpress/block-editor";

import {
	PanelBody,
	PanelRow,
	ToggleControl,
	RangeControl,
	__experimentalRadio as Radio,
	__experimentalRadioGroup as RadioGroup,
	__experimentalNumberControl as NumberControl,
} from "@wordpress/components";

import { more } from "@wordpress/icons";

import { useState } from "@wordpress/element";

function CarouselControls(props) {
	const [isAutoplayEnabled, setIsAutoplayEnabled] = useState(
		props.isAutoplayEnabled
	);
	const [isShowArrowsEnabled, setIsShowArrowsEnabled] = useState(
		props.isShowArrowsEnabled
	);
	const [isPaginationEnabled, setIsPaginationEnabled] = useState(
		props.isPaginationEnabled
	);
	const [animationMode, setAnimationMode] = useState(props.animationMode);
	const [slidesPerPage, setSlidesPerPage] = useState(props.slidesPerPage);
	const [slidesPerMove, setSlidesPerMove] = useState(props.slidesPerMove);
	const [slideGap, setSlideGap] = useState(props.slideGap);
	const [focusPosition, setFocusPosition] = useState(props.focusPosition);
	const [focusType, setFocusType] = useState(props.focusType);
	const [focusSliderMarks, setFocusSliderMarks] = useState([
		{ value: 1, label: "1" },
	]);

	const onChangeAutoplayEnabled = () => {
		setIsAutoplayEnabled(!isAutoplayEnabled);
		props.onChangeAutoplayEnabled(!isAutoplayEnabled);
	};

	const onChangeArrowsEnabled = () => {
		setIsShowArrowsEnabled(!isShowArrowsEnabled);
		props.onChangeArrowsEnabled();
	};

	const onChangePaginationEnabled = () => {
		setIsPaginationEnabled(!isPaginationEnabled);
		props.onChangePaginationEnabled();
	};

	const onChangeAnimationMode = (mode) => {
		setAnimationMode(mode);
		props.onChangeAnimationMode(mode);
	};

	const onChangeSlidesPerPage = (number) => {
		setSlidesPerPage(number);
		props.onChangeSlidesPerPage(number);
		generateFocusPositionMarks(number);
	};

	const onChangeSlidesPerMove = (number) => {
		setSlidesPerMove(number);
		props.onChangeSlidesPerMove(number);
	};

	const onChangeSlideGap = (number) => {
		setSlideGap(number);
		props.onChangeSlideGap(number);
	};

	const onChangeFocusType = (type) => {
		setFocusType(type);
		props.onChangeFocusType(type);
	};

	const onChangeFocusPosition = (position) => {
		setFocusPosition(position);
		props.onChangeFocusPosition(position);
	};

	const generateFocusPositionMarks = (max) => {
		let marks = [];
		for (let i = 1; i <= max; i++) {
			marks[i] = {
				value: i,
				label: "" + i,
			};
		}

		setFocusSliderMarks(marks);
	};

	return (
		<>
			<InspectorControls>
				<PanelBody
					title="General"
					icon={more}
					initialOpen={true}
					className="inspector-controls"
				>
					<PanelRow className="__animation">
						<h2>Animation</h2>
						<RadioGroup
							id="default-radiogroup"
							onChange={onChangeAnimationMode}
							label="animation"
							className="__button-group"
							checked={animationMode}
						>
							<Radio value="loop">loop</Radio>
							<Radio value="slide">slide</Radio>
							<Radio value="fade">fade</Radio>
						</RadioGroup>
					</PanelRow>
					<PanelRow className="__slides-per-page">
						<h2>Slides Per Page</h2>
						<RangeControl
							help="Additional info about this."
							allowReset
							resetFallbackValue={1}
							step={1}
							withInputField={true}
							separatorType="none"
							isShiftStepEnabled
							marks={[
								{
									value: 1,
									label: "1",
								},
								{
									value: 2,
									label: "2",
								},
								{
									value: 3,
									label: "3",
								},
								{
									value: 4,
									label: "4",
								},
								{
									value: 5,
									label: "5",
								},
							]}
							value={slidesPerPage}
							onChange={onChangeSlidesPerPage}
							min={1}
							max={5}
						/>
					</PanelRow>
					<PanelRow className="__per-move">
						<h2>Slides Per Move</h2>
						<RangeControl
							help="Additional info about this."
							allowReset
							resetFallbackValue={1}
							step={1}
							withInputField={true}
							separatorType="none"
							isShiftStepEnabled
							marks={[
								{
									value: 1,
									label: "1",
								},
								{
									value: 2,
									label: "2",
								},
								{
									value: 3,
									label: "3",
								},
								{
									value: 4,
									label: "4",
								},
								{
									value: 5,
									label: "5",
								},
							]}
							value={slidesPerMove}
							onChange={onChangeSlidesPerMove}
							min={1}
							max={5}
						/>
					</PanelRow>
					<PanelRow className="__gap">
						<h2>Gap</h2>
						<RangeControl
							help="Additional info about this."
							allowReset
							resetFallbackValue={0}
							step={5}
							withInputField={true}
							separatorType="none"
							isShiftStepEnabled
							marks={[
								{
									value: 0,
									label: "0",
								},
								{
									value: 20,
									label: "20",
								},
								{
									value: 40,
									label: "40",
								},
								{
									value: 60,
									label: "60",
								},
								{
									value: 80,
									label: "80",
								},
								{
									value: 100,
									label: "100",
								},
							]}
							value={slideGap}
							onChange={onChangeSlideGap}
							min={0}
							max={100}
						/>
					</PanelRow>
					<PanelRow className="__focus">
						<h2>Focus</h2>
						<RadioGroup
							onChange={onChangeFocusType}
							label="animation"
							className="__button-group"
							checked={focusType}
						>
							<Radio value="center">center</Radio>
							<Radio value="number">number</Radio>
						</RadioGroup>

						{focusType === "number" && (
							<RangeControl
								help="Additional info about this."
								step={1}
								separatorType="none"
								className="__range-control"
								isShiftStepEnabled
								marks={focusSliderMarks}
								value={focusPosition}
								onChange={onChangeFocusPosition}
								min={1}
								max={slidesPerPage}
							/>
						)}
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label="Autoplay"
							help="Help message for autoplay enabling"
							checked={isAutoplayEnabled}
							onChange={onChangeAutoplayEnabled}
						/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label="Show Arrows"
							help="Help message for showing arrows"
							checked={isShowArrowsEnabled}
							onChange={onChangeArrowsEnabled}
						/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label="Show Pagination"
							help="Help message for showing pagination"
							checked={isPaginationEnabled}
							onChange={onChangePaginationEnabled}
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
		</>
	);
}

export default CarouselControls;
