import { MobileNavContentRequestPayload, MobileNavContentSuccessPayload } from './navbar.types';
import { APIError } from '../../../api/error';

export const mockRequestPayload: MobileNavContentRequestPayload = {
  id: 'ID'
};

export const mockError: APIError = {
  name: 'error',
  error: 'error',
  status: 404,
  message: 'error'
};

export const mockSuccessPayload: MobileNavContentSuccessPayload = {
  categories: [
    {
      name: 'test',
      image: {
        url: 'test',
        details: {
          size: 123
        },
        fileName: 'test',
        contentType: 'test'
      },
      link: '/test',
      designWithArrow: false
    }
  ]
};

export const mockContentfulNavCategoryDirectLink = {
  name: 'test',
  image: {
    fields: {
      file: {
        url: 'test',
        details: {
          size: 123
        },
        fileName: 'test',
        contentType: 'test'
      }
    }
  },
  link: '/test',
  designWithArrow: false
};

export const mockContentfulResponse = {
  items: [
    {
      fields: {
        categories: [
          {
            fields: mockContentfulNavCategoryDirectLink
          }
        ]
      }
    }
  ]
};
