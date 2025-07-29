import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

interface ImageListProps {
    images: any[];
    altText?: string;
    cols?: number;
    rowHeight?: number;
}

const CustomImageList: React.FC<ImageListProps> = ({
    images,
    altText = 'Image',
    cols = 3,
    rowHeight = 164
}) => {
    return (
        <ImageList sx={{ width: '100%' }} cols={cols} rowHeight={rowHeight}>
            {images.map((image, index) => (
                <ImageListItem key={index}>
                    <img
                        src={`${image.url}?w=164&h=164&fit=crop&auto=format`}
                        srcSet={`${image.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        alt={altText}
                        loading="lazy"
                    />
                </ImageListItem>
            ))}
        </ImageList>
    );
};

export default CustomImageList;