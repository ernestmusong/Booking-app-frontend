import PropTypes from 'prop-types';

export default function Title({ title, subTitle }) {
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
