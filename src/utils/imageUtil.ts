export const getImageUrl = (imagePath: string | undefined | null) => {

    if (!imagePath) {
        return '/images/default.jpg';
    }

    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        return imagePath;
    }

    return `http://localhost:3000${imagePath}`;
}