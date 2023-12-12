import type {
	KeenSliderHooks,
	KeenSliderInstance,
	KeenSliderOptions,
	SliderOptions
} from 'keen-slider';

export type Classes = {
	container?: string;
	slider?: string;
	slide?: string;
	dotsWrapper?: string;
	dot?: string;
	arrowsWrapper?: string;
	arrowLeftWrapper?: string;
	arrowRightWrapper?: string;
	arrowLeft?: string;
	arrowRight?: string;
};

interface AutoPlayPluginOptions {
	delay: number;
}

export interface ExtendedKeenSliderOptions
	extends SliderOptions<KeenSliderOptions<{}, {}, KeenSliderHooks>> {
	arrows?: boolean;
	dots?: boolean;
	autoPlayPlugin?: AutoPlayPluginOptions;
}

export interface ExtendedKeenSliderInstance extends KeenSliderInstance {
	options: ExtendedKeenSliderOptions;
}
