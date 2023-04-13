export const Button = (props) => {
    const {onClick, children, className} = props;
    return (
      <button className={className} onClick={onClick}>
        {children}
      </button>
    );
}