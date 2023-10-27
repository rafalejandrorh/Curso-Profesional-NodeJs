const withErrorStack = require('../../API/Utils/withErrorStack');

describe('[ Tests / withErrorStack ]', () => {
    it('Should return the error with stack', () => {
        // Arrange
        const error = { message: 'Error' };
        const stack = { TypeError: 'Error in Line 32' };
        const expected = {
            message: 'Error',
            stack: {
                TypeError: 'Error in Line 32'
            }
        };
        
        // Action
        const result = withErrorStack(error, stack, true);

        // Assert
        expect(result).toEqual(expected)
    });

    it('Should return the error without stack', () => {
        // Arrange
        const error = { message: 'Error' };
        const stack = { TypeError: 'Error in Line 32' };
        const expected = { message: 'Error' };

        // Action
        const result = withErrorStack(error, stack, false);

        // Assert
        expect(result).toEqual(expected)
    });
});