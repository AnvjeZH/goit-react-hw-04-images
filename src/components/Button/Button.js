import css from './Button.module.css'

const Button = ({ onClick }) => (
  <button className={css.button} type="button" onClick={onClick}>
    Load more
  </button>
);

export default Button;
