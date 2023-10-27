const tweetsService = require('../../API/Services/tweetsService');
const tweetsRepository = require('../../API/Repositories/tweetsRepository');

jest.mock('../Repositories/tweetsRepository', () => ({
    getTweets: jest.fn(() => ['tweet1', 'tweet2', 'tweet3'])
}));

describe('[ Services / tweetsService ]', () => {

    describe('[ getTweets ]', () => {

        it('Should return get all tweets', async () => {
            // Arrange
            const expected = ['tweet1', 'tweet2', 'tweet3'];
            
            // Action
            const result = await tweetsService.getTweets();

            // Assert
            expect(result).toEqual(expected);
            
            // Another Assert
            expect(tweetsRepository.getTweets).toHaveBeenCalled();
        });

    });
});