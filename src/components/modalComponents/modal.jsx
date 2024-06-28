import { Header } from "./header";
import { Footer } from "./footer";

export const Modal = (props) => {
  return (
    <>
      <div className="modal">
        <Header
          dailyWord={props.dailyWord}
          setCompleted={props.setCompleted}
          completed={props.completed}
          correctWord={props.correctWord}
          setCorrectWord={props.setCorrectWord}
        />
        <Footer definition={props.definition}/>
      </div>
    </>
  );
};
