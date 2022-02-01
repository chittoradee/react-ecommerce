import classes from './productdetail.module.css';
const ImageHoverZoom = ({ imagePath }) => {
    return (
      <div className={classes['img-wrapper']}>
        <img src={imagePath} alt="" className={classes['hover-zoom']} />
      </div>
    );
  };
  export default ImageHoverZoom;