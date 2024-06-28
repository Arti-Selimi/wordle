import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faTimesCircle } from "@fortawesome/free-regular-svg-icons";

export const Header = (props) => {
  return (
    <>
      <div className="header">
        <FontAwesomeIcon
          icon={props.completed ? faCircle : faTimesCircle}
          className="fa-icon"
          onClick={() => {
            props.setCompleted(false);
            window.location.reload();
          }}
        />
        <p>
          {props.completed && props.correctWord
            ? `Good job!!!
                    The word was ${props.dailyWord.join("")}`
            : `Nice try!!! The word was ${props.dailyWord.join("")}`}
        </p>
      </div>
    </>
  );
};
