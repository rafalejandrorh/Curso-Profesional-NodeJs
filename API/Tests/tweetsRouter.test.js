const serverTest = require('./serverTest');
const v1 = require('../Routes/v1');
const request = serverTest(v1);

jest.mock('../Services/tweetsService', () => ({
    getTweets: jest.fn(() => ['tweet1', 'tweet2', 'tweet3'])
}));

describe('[ Routes / v1 ]', () => {

    it('Should return a response with status 200', async () => {
        // Arrange
        const expected = 200;
        
        // Action
        const { status:result } = await request.get('/v1/tweets');

        // Assert
        expect(result).toEqual(expected);
    });
    
    it('Should return all tweets', async () => {
        // Arrange
        const expected = ['tweet1', 'tweet2', 'tweet3'];
        
        // Action
        const { body:result } = await request.get('/v1/tweets');

        // Assert
        expect(result).toEqual(expected);
    });
    
});