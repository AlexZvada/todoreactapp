import { Button } from "./Button";

export const HeaderButton = ({text, icon, onClick, className}) => {

    return (
      <Button className={`btn btn--${className}`} onClick={onClick}>
        <span className="login-btns-inner">
          <span className="login-btns-text">{text}</span>
          <img src={icon} alt="" className="btn-img-arrow" />
        </span>
      </Button>
    );

}
