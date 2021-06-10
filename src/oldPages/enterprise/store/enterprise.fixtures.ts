import { EnterpriseRequestPayload, EnterpriseSuccessPayload, EnterprisePageContent } from './enterprise.types';
import { APIError } from '../../../api/error';
import { mockContentfulFaq } from '../../FAQ/store/faqs.fixtures';
import { UrlType } from '../../../contentful/contentful.types';

export const mockRequestPayload: EnterpriseRequestPayload = {
  id: 'ID'
};

export const mockSuccessPayload: EnterpriseSuccessPayload = {
  meta: { name: 'foo', description: 'foo?', imageUrl: 'foo!', title: 'FOO' },
  faqs: [{ answer: 'a lot', question: 'how much?' }],
  heroLockup: {
    header: 'test',
    paragraph: 'test',
    imagePosition: 'left',
    imageUrl: 'test',
    cta: undefined,
    isVertical: false
  },
  horizontalLockup: {
    header: 'test',
    paragraph: 'test',
    imagePosition: 'left',
    imageUrl: 'test',
    cta: { label: 'test', url: 'test', urlType: UrlType.EMAIL },
    isVertical: false
  },
  horizontalLockup2: {
    header: 'test',
    paragraph: 'test',
    imagePosition: 'left',
    imageUrl: 'test',
    cta: { label: 'test', url: 'test', urlType: UrlType.EMAIL },
    isVertical: false
  },
  productShowcase: { title: 'test', furnitureIdentifiers: ['test'] },
  titleButtonLockup: { title: 'test', ctaButton: { label: 'test', url: 'test', urlType: UrlType.EMAIL } },
  titledTripleVerticalImageLockup: {
    title: 'test',
    imageLockups: [
      { header: 'test', paragraph: 'test', imageUrl: 'test', imagePosition: 'left', cta: undefined, isVertical: true }
    ]
  }
};

export const mockError: APIError = {
  name: 'sad lil fail boi',
  error: 'sad lil fail boi',
  status: 404,
  message: 'it works on my computer'
};

export const mockContentfulHeroLockup = {
  header: 'test',
  paragraph: {
    data: {},
    nodeType: 'document',
    content: [
      {
        data: {},
        marks: [],
        nodeType: 'text',
        value: 'test'
      }
    ]
  },
  imagePosition: 'left',
  imageUrl: 'test',
  isVertical: false
};

export const mockContentfulHorizontalLockup = {
  header: 'test',
  paragraph: {
    data: {},
    nodeType: 'document',
    content: [
      {
        data: {},
        marks: [],
        nodeType: 'text',
        value: 'test'
      }
    ]
  },
  imagePosition: 'left',
  imageUrl: 'test',
  cta: {
    fields: {
      label: 'test',
      url: 'test',
      urlType: 'email'
    }
  },
  isVertical: false
};

export const mockContentfulProductShowcase = {
  title: 'test',
  furnitureIdentifiers: ['test']
};

export const mockContentfulTitleButtonLockup = {
  title: 'test',
  ctaButton: {
    fields: {
      label: 'test',
      url: 'test',
      urlType: 'email'
    }
  }
};

export const mockContentfulTitledTripleVerticalImageLockup = {
  title: 'test',
  imageLockups: [
    {
      fields: {
        header: 'test',
        paragraph: {
          data: {},
          nodeType: 'document',
          content: [
            {
              data: {},
              marks: [],
              nodeType: 'text',
              value: 'test'
            }
          ]
        },
        imageUrl: 'test',
        imagePosition: 'left',
        isVertical: true
      }
    }
  ]
};

const mockMeta = {
  name: 'foo',
  description: 'foo?',
  imageUrl: 'foo!',
  title: 'FOO'
};

export const mockContentfulResponse = ({
  items: [
    {
      fields: {
        faqs: {
          fields: {
            faqs: [
              {
                fields: mockContentfulFaq
              }
            ]
          }
        },
        heroLockup: {
          fields: mockContentfulHeroLockup
        },
        horizontalLockup: {
          fields: mockContentfulHorizontalLockup
        },
        horizontalLockup2: {
          fields: mockContentfulHorizontalLockup
        },
        productShowcase: {
          fields: mockContentfulProductShowcase
        },
        titleButtonLockup: {
          fields: mockContentfulTitleButtonLockup
        },
        titledTripleVerticalImageLockup: {
          fields: mockContentfulTitledTripleVerticalImageLockup
        },
        meta: {
          fields: mockMeta
        }
      }
    }
  ]
} as object) as EnterprisePageContent;
