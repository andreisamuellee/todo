import { ClickAwayListener } from "@mui/base";
import React from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useSwipeable } from "react-swipeable";
import TextareaAutosize from "@mui/base/TextareaAutosize";

interface ITodoProps {
  id: number;
  description: string;
  setTodoChanges: Function;
}

function useDoubleClick(actionDoubleClick: Function, delay = 250) {
  const [click, setClick] = React.useState(0);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setClick(0);
    }, delay);

    if (click === 2) actionDoubleClick();
    return () => clearTimeout(timer);
  }, [click]);

  return () => setClick((prev) => prev + 1);
}

export default function Todo(props: ITodoProps) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [value, setValue] = React.useState(props.description);
  const [backgroundColorClass, setBackgroundColorClass] = React.useState("");
  const backgroundColors = ["bg-emerald-400", "bg-purple-400", "bg-red-400"];
  const [deleteAnimation, setDeleteAnimation] = React.useState("");
  const click = useDoubleClick(() => setIsEditing((prevState) => !prevState));

  const handlers = useSwipeable({
    onSwipedLeft: (eventData) => handleDelete("left"),
    onSwipedRight: (eventData) => handleDelete("right"),
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  React.useEffect(() => {
    setValue(props.description);
  }, [props.description]);

  React.useEffect(() => {
    setRandomColor();
  }, []);

  React.useEffect(() => {
    if (!isEditing && value !== props.description) {
      updateTodo();
    }
  }, [isEditing]);

  const setRandomColor = () => {
    const randomBackgroundColor =
      backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
    setBackgroundColorClass(randomBackgroundColor);
  };

  const deleteTodo = async (id: number) => {
    try {
      await fetch("/todos/" + id.toString(), {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }).finally(props.setTodoChanges((prevState: number) => prevState + 1));
    } catch (error) {
      console.log(error);
    }
  };

  const updateTodo = async () => {
    try {
      const body = { description: value };
      await fetch("/todos/" + props.id.toString(), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
        .then(() => props.setTodoChanges((prevState: number) => prevState + 1))
        .finally(() => setIsEditing(false));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (swipeDirection: string) => {
    setDeleteAnimation(`animate-fly-${swipeDirection}`);
    setTimeout(() => {
      deleteTodo(props.id);
    }, 700);
  };

  return (
    <div
      className={`flex sm:rounded-md transition-colors justify-between p-5 text-white ${backgroundColorClass} ${deleteAnimation}`}
      onClick={click}
      {...handlers}
    >
      {isEditing ? (
        <ClickAwayListener onClickAway={() => setIsEditing(false)}>
          <form className="w-full">
            <TextareaAutosize
              autoFocus
              className="w-full resize-none bg-transparent"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            ></TextareaAutosize>
          </form>
        </ClickAwayListener>
      ) : (
        <span className="break-words w-full">{props.description}</span>
      )}
    </div>
  );
}
