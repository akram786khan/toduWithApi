
// Add your font family in the return statement of switch case and call fonts function like this { fonts('regular') } to use Font Family. 

export type fontTypes = 'regular' | 'medium' | 'bold' | 'light';

export const fonts: (type: fontTypes) => string = function (type = 'regular') {
  switch (type) {
    case 'regular':
      return 'ChivoMono-Regular';

    case 'bold':
      return 'ChivoMono-Bold';

    case 'light':
      return 'ChivoMono-Light';

    case 'medium':
      return 'ChivoMono-Medium';

    default:
      return '';

  }
};
