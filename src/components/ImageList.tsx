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
        <ImageList sx={{width:'100%'}} cols={Math.min(images.length, cols)} rowHeight={rowHeight}>
            {images.map((image, index) => (
                <ImageListItem key={index}>
                    <img
                        src={image.url}
                        alt={altText}
                        loading="lazy"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            borderRadius: 4,
                        }}
                    />
                </ImageListItem>
            ))}
        </ImageList>
    );
};

export default CustomImageList;