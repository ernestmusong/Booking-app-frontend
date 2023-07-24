import PropTypes from 'prop-types';

 const Title = ({ title, subTitle }) => {
  return (
    <>
      <h1 className="text-uppercase font-weight-bold text-center ">{title}</h1>
      <p className="text-center text-muted">{ subTitle }</p>
    </>
  );
}

Title.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
};

export default Title;
