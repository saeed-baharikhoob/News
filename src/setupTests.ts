import '@testing-library/jest-dom';


const mockAxios : any = {
    create: jest.fn(() => mockAxios),
    get: jest.fn(() => Promise.resolve({ data: {} })),
    post: jest.fn(() => Promise.resolve({ data: {} })),
    put: jest.fn(() => Promise.resolve({ data: {} })),
    delete: jest.fn(() => Promise.resolve({ data: {} })),
    defaults: {
        headers: {
            common: {}
        }
    }
};

jest.mock('axios', () => mockAxios);