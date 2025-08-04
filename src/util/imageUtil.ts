export const getImageUrl = (imagePath: string) => {

    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        return imagePath;
    }

    return `http://localhost:3000/${imagePath}`;
}