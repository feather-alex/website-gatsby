import { StyleTagChoice } from '../store/quiz.types';

const constructImageUrl = (pathToImage: string) => {
  const imageBaseUrl = `https://img.livefeather.com/quiz/v3-images-2/`;
  const imageParams = `?auto=compress&q=65`;

  return `${imageBaseUrl}${pathToImage}${imageParams}`;
};

export const images = [
  {
    choice: '1_feminine',
    tag: [StyleTagChoice.Feminine],
    src: constructImageUrl('1_feminine.jpg')
  },
  {
    choice: '2_feminine',
    tag: [StyleTagChoice.Feminine],
    src: constructImageUrl('2_feminine.jpg')
  },
  {
    choice: '3_feminine',
    tag: [StyleTagChoice.Feminine],
    src: constructImageUrl('3_feminine.jpg')
  },
  {
    choice: '4_feminine',
    tag: [StyleTagChoice.Feminine],
    src: constructImageUrl('4_feminine.jpg')
  },
  {
    choice: '5_feminine',
    tag: [StyleTagChoice.Feminine],
    src: constructImageUrl('5_feminine.jpg')
  },
  {
    choice: '6_masculine',
    tag: [StyleTagChoice.Masculine],
    src: constructImageUrl('6_masculine.jpg')
  },
  {
    choice: '7_masculine',
    tag: [StyleTagChoice.Masculine],
    src: constructImageUrl('7_masculine.jpg')
  },
  {
    choice: '8_masculine',
    tag: [StyleTagChoice.Masculine],
    src: constructImageUrl('8_masculine.jpg')
  },
  {
    choice: '9_masculine',
    tag: [StyleTagChoice.Masculine],
    src: constructImageUrl('9_masculine.jpg')
  },
  {
    choice: '10_masculine',
    tag: [StyleTagChoice.Masculine],
    src: constructImageUrl('10_masculine.jpg')
  },
  {
    choice: '11_scandinavian',
    tag: [StyleTagChoice.Scandinavian],
    src: constructImageUrl('11_scandinavian.jpg')
  },
  {
    choice: '12_scandinavian',
    tag: [StyleTagChoice.Scandinavian],
    src: constructImageUrl('12_scandinavian.jpg')
  },
  {
    choice: '13_scandinavian',
    tag: [StyleTagChoice.Scandinavian],
    src: constructImageUrl('13_scandinavian.jpg')
  },
  {
    choice: '14_scandinavian',
    tag: [StyleTagChoice.Scandinavian],
    src: constructImageUrl('14_scandinavian.jpg')
  },
  {
    choice: '15_scandinavian',
    tag: [StyleTagChoice.Scandinavian],
    src: constructImageUrl('15_scandinavian.jpg')
  },
  {
    choice: '16_minimalist',
    tag: [StyleTagChoice.Minimalist],
    src: constructImageUrl('16_minimalist.jpg')
  },
  {
    choice: '17_minimalist',
    tag: [StyleTagChoice.Minimalist],
    src: constructImageUrl('17_minimalist.jpg')
  },
  {
    choice: '18_minimalist',
    tag: [StyleTagChoice.Minimalist],
    src: constructImageUrl('18_minimalist.jpg')
  },
  {
    choice: '19_minimalist',
    tag: [StyleTagChoice.Minimalist],
    src: constructImageUrl('19_minimalist.jpg')
  },
  {
    choice: '20_minimalist',
    tag: [StyleTagChoice.Minimalist],
    src: constructImageUrl('20_minimalist.jpg')
  },
  {
    choice: '21_warm-natural',
    tag: [StyleTagChoice.WarmNatural],
    src: constructImageUrl('21_warm_natural.png')
  },
  {
    choice: '22_warm-natural',
    tag: [StyleTagChoice.WarmNatural],
    src: constructImageUrl('22_warm_natural.png')
  },
  {
    choice: '23_warm-natural',
    tag: [StyleTagChoice.WarmNatural],
    src: constructImageUrl('23_warm_natural.png')
  },
  {
    choice: '24_warm-natural',
    tag: [StyleTagChoice.WarmNatural],
    src: constructImageUrl('24_warm_natural.png')
  },
  {
    choice: '25_warm-natural',
    tag: [StyleTagChoice.WarmNatural],
    src: constructImageUrl('25_warm_natural.png')
  },
  {
    choice: '26_warm-natural',
    tag: [StyleTagChoice.WarmNatural],
    src: constructImageUrl('26_warm_natural.png')
  },
  {
    choice: '27_statement',
    tag: [StyleTagChoice.Statement],
    src: constructImageUrl('27_statement.jpg')
  },
  {
    choice: '28_statement',
    tag: [StyleTagChoice.Statement],
    src: constructImageUrl('28_statement.jpg')
  },
  {
    choice: '29_statement',
    tag: [StyleTagChoice.Statement],
    src: constructImageUrl('29_statement.jpg')
  },
  {
    choice: '30_statement',
    tag: [StyleTagChoice.Statement],
    src: constructImageUrl('30_statement.jpg')
  },
  {
    choice: '31_statement',
    tag: [StyleTagChoice.Statement],
    src: constructImageUrl('31_statement.jpg')
  },
  {
    choice: '32_mid-century',
    tag: [StyleTagChoice.MidCentury],
    src: constructImageUrl('32_mid-century.jpg')
  },
  {
    choice: '33_mid-century',
    tag: [StyleTagChoice.MidCentury],
    src: constructImageUrl('33_mid-century.jpg')
  },
  {
    choice: '34_mid-century',
    tag: [StyleTagChoice.MidCentury],
    src: constructImageUrl('34_mid-century.jpg')
  },
  {
    choice: '35_mid-century',
    tag: [StyleTagChoice.MidCentury],
    src: constructImageUrl('35_mid-century.jpg')
  },
  {
    choice: '36_mid-century',
    tag: [StyleTagChoice.MidCentury],
    src: constructImageUrl('36_mid-century.jpg')
  }
];
