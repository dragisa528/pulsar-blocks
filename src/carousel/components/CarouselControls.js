import { InspectorControls } from "@wordpress/block-editor";

import {
	PanelBody,
	PanelRow,
	ToggleControl,
	RangeControl,
	__experimentalRadio as Radio,
	__experimentalRadioGroup as RadioGroup,
} from "@wordpress/components";

import { more } from "@wordpress/icons";

import { useState, useEffect } from "@wordpress/element";

function CarouselControls(props) {
	const [isAutoplayEnabled, setIsAutoplayEnabled] = useState(props.autoplay);
	const [isShowArrowsEnabled, setIsShowArrowsEnabled] = useState(props.arrows);
	const [isPaginationEnabled, setIsPaginationEnabled] = useState(
		props.pagination
	);
	const [animationMode, setAnimationMode] = useState(props.type);
	const [breakpointScreen, setBreakpointScreen] = useState("desktop");
	const [mobileAttributes, setMobileAttributes] = useState(props.mobileOptions);
	const [tabletAttributes, setTabletAttributes] = useState(props.tabletOptions);
	const [desktopAttributes, setDesktopAttributes] = useState(
		props.desktopOptions
	);

	const onChangeBreakpointScreen = (screen) => {
		setBreakpointScreen(screen);
	};

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

	const onChangeDesktopAttribute = (object) => {
		const key = Object.keys(object)[0];
		const value = Object.values(object)[0];
		setDesktopAttributes({ ...desktopAttributes, [key]: value });
		props.onChangeDesktopAttributes({ ...desktopAttributes, [key]: value });
	};

	const onChangeTabletAttribute = (object) => {
		const key = Object.keys(object)[0];
		const value = Object.values(object)[0];
		setTabletAttributes({ ...tabletAttributes, [key]: value });
		props.onChangeTabletAttributes({ ...tabletAttributes, [key]: value });
	};

	const onChangeMobileAttribute = (object) => {
		const key = Object.keys(object)[0];
		const value = Object.values(object)[0];
		setMobileAttributes({ ...mobileAttributes, [key]: value });
		props.onChangeMobileAttributes({ ...mobileAttributes, [key]: value });
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
					<PanelRow className="__breakpoints">
						<h2>Breakpoint Options</h2>
						<RadioGroup
							onChange={onChangeBreakpointScreen}
							label="breakpoints"
							className="__button-group"
							checked={breakpointScreen}
						>
							<Radio value="desktop">desktop</Radio>
							<Radio value="tablet">tablet</Radio>
							<Radio value="mobile">mobile</Radio>
						</RadioGroup>

						{breakpointScreen === "desktop" && (
							<BreakpointScreenOptions
								options={desktopAttributes}
								onChangeAttribute={onChangeDesktopAttribute}
							/>
						)}
						{breakpointScreen === "tablet" && (
							<BreakpointScreenOptions
								options={tabletAttributes}
								onChangeAttribute={onChangeTabletAttribute}
							/>
						)}
						{breakpointScreen === "mobile" && (
							<BreakpointScreenOptions
								options={mobileAttributes}
								onChangeAttribute={onChangeMobileAttribute}
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

function BreakpointScreenOptions(props) {
	const [perPage, setPerPage] = useState(props.options.perPage);
	const [perMove, setPerMove] = useState(props.options.perMove);
	const [gap, setGap] = useState(props.options.gap);
	const [focusType, setFocusType] = useState(props.options.focusType);
	const [focusPosition, setFocusPosition] = useState(
		props.options.focusPosition
	);
	const [focusSliderMarks, setFocusSliderMarks] = useState([
		{ value: 1, label: "1" },
	]);

	const onChangePerPage = (number) => {
		setPerPage(number);
		props.onChangeAttribute({ perPage: number });
	};

	const onChangePerMove = (number) => {
		setPerMove(number);
		props.onChangeAttribute({ perMove: number });
	};

	const onChangeGap = (number) => {
		setGap(number);
		props.onChangeAttribute({ gap: number });
	};

	const onChangeFocusType = (string) => {
		setFocusType(string);
		props.onChangeAttribute({ focusType: string });
	};

	const onChangeFocusPosition = (number) => {
		setFocusPosition(number);
		props.onChangeAttribute({ focusPosition: number });
	};

	const generateFocusPositionMarks = () => {
		let marks = [];
		for (let i = 1; i <= perPage; i++) {
			marks[i] = {
				value: i,
				label: "" + i,
			};
		}

		setFocusSliderMarks(marks);
	};

	useEffect(() => {
		generateFocusPositionMarks();
	}, [perPage]);

	return (
		<>
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
					value={perPage}
					onChange={onChangePerPage}
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
					value={perMove}
					onChange={onChangePerMove}
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
					value={gap}
					onChange={onChangeGap}
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
						max={perPage}
					/>
				)}
			</PanelRow>
		</>
	);
}

export default CarouselControls;
