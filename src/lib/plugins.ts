import type { KeenSliderPlugin } from 'keen-slider';
import type { ExtendedKeenSliderInstance } from './types.js';

export const AdaptiveHeightPlugin: KeenSliderPlugin = (slider: ExtendedKeenSliderInstance) => {
	function updateHeight() {
		slider.container.style.height = '0px';
		slider.container.style.height = slider.slides[slider.track.details.rel].offsetHeight + 'px';
	}
	slider.on('created', updateHeight);
	slider.on('slideChanged', updateHeight);
};

export const AutoplayPlugin: KeenSliderPlugin = (slider: ExtendedKeenSliderInstance) => {
	let timeout: ReturnType<typeof setTimeout>;
	let mouseOver = false;
	function clearNextTimeout() {
		clearTimeout(timeout);
	}
	function nextTimeout() {
		clearTimeout(timeout);
		if (mouseOver) return;
		timeout = setTimeout(
			() => {
				slider.next();
			},
			slider.options?.autoPlayPlugin?.delay ?? 3000
		);
	}
	slider.on('created', () => {
		slider.container.addEventListener('mouseover', () => {
			mouseOver = true;
			clearNextTimeout();
		});
		slider.container.addEventListener('mouseout', () => {
			mouseOver = false;
			nextTimeout();
		});
		nextTimeout();
	});
	slider.on('dragStarted', clearNextTimeout);
	slider.on('animationEnded', nextTimeout);
	slider.on('updated', nextTimeout);
};

export const WheelControlsPlugin: KeenSliderPlugin = (slider: ExtendedKeenSliderInstance) => {
	let touchTimeout: ReturnType<typeof setTimeout>;
	let position: {
		x: number;
		y: number;
	};
	let wheelActive: boolean;

	function dispatch(e: WheelEvent, name: string) {
		position.x -= e.deltaX;
		position.y -= e.deltaY;
		slider.container.dispatchEvent(
			new CustomEvent(name, {
				detail: {
					x: position.x,
					y: position.y
				}
			})
		);
	}

	function wheelStart(e: WheelEvent) {
		position = {
			x: e.pageX,
			y: e.pageY
		};
		dispatch(e, 'ksDragStart');
	}

	function wheel(e: WheelEvent) {
		dispatch(e, 'ksDrag');
	}

	function wheelEnd(e: WheelEvent) {
		dispatch(e, 'ksDragEnd');
	}

	function eventWheel(e: WheelEvent) {
		e.preventDefault();
		if (!wheelActive) {
			wheelStart(e);
			wheelActive = true;
		}
		wheel(e);
		clearTimeout(touchTimeout);
		touchTimeout = setTimeout(() => {
			wheelActive = false;
			wheelEnd(e);
		}, 50);
	}

	slider.on('created', () => {
		slider.container.addEventListener('wheel', eventWheel, {
			passive: false
		});
	});
};

export const ThumbnailPlugin: KeenSliderPlugin = (main: ExtendedKeenSliderInstance) => {
	return (slider: ExtendedKeenSliderInstance) => {
		function removeActive() {
			slider.slides.forEach((slide) => {
				slide.classList.remove('active');
			});
		}
		function addActive(idx: number) {
			slider.slides[idx].classList.add('active');
		}

		function addClickEvents() {
			slider.slides.forEach((slide, idx) => {
				slide.addEventListener('click', () => {
					main.moveToIdx(idx);
				});
			});
		}

		slider.on('created', () => {
			addActive(slider.track.details.rel);
			addClickEvents();
			main.on('animationStarted', (main) => {
				removeActive();
				const next = main.animator.targetIdx || 0;
				addActive(main.track.absToRel(next));
				slider.moveToIdx(Math.min(slider.track.details.maxIdx, next));
			});
		});
	};
};
