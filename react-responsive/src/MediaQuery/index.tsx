import { useMediaQuery } from 'useMediaQuery';
import { ReactNode } from 'react';

type NumberDPPX = number | `${number}dppx`;
type NumberPX = number | `${number}px`;

interface Media {
  orientation: 'landscape' | 'portrait';
  minResolution: NumberDPPX;
  maxResolution: NumberDPPX;
  minWidth: NumberPX;
  maxWidth: NumberPX;
  minHeight: NumberPX;
  maxHeight: NumberPX;
}

interface Props extends Partial<Media> {
  children: ReactNode | ((match: boolean) => ReactNode);
}

const createQuery = (param: string, value?: string | number, unit: 'px' | 'dppx' | '' = 'px'): string => {
  if (!value) {
    return '';
  }
  const valueIsString = typeof value === 'string';
  return `(${param}: ${valueIsString ? value : value + unit})`;
};

function MediaQuery(props: Props) {
  const { orientation, minResolution, maxResolution, minWidth, maxWidth, minHeight, maxHeight, children } = props;

  const query = [
    createQuery('orientation', orientation, ''),
    createQuery('min-resolution', minResolution, 'dppx'),
    createQuery('max-resolution', maxResolution, 'dppx'),
    createQuery('min-width', minWidth),
    createQuery('max-width', maxWidth),
    createQuery('min-height', minHeight),
    createQuery('max-height', maxHeight),
  ].reduce((prev, current) => {
    if (prev && current) {
      return prev + ' and ' + current;
    }

    return prev + current;
  });

  const isMatch = useMediaQuery({ query });

  return <>{typeof children === 'function' ? children(isMatch) : isMatch ? children : null}</>;
}

export default MediaQuery;
