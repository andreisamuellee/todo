import React from "react";

interface IInputTodoProps {
  todoChanges: number;
  setTodoChanges: Function;
}

export default function InputTodo(props: IInputTodoProps) {
  const [description, setDescription] = React.useState("");
  const [colorShuffle, setColorShuffle] = React.useState(false);
  const [textColorClass, setTextColorClass] = React.useState("");
  const textColors = ["text-emerald-400", "text-purple-400", "text-red-400"];

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setColorShuffle((prev) => !prev);
    try {
      const body = { description };
      await fetch("http://localhost:4000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
        .then(() => props.setTodoChanges(props.todoChanges + 1))
        .finally(() => setDescription(""));
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    setRandomColor();
  }, [colorShuffle]);

  const setRandomColor = () => {
    const randomBackgroundColor =
      textColors[Math.floor(Math.random() * textColors.length)];
    setTextColorClass(randomBackgroundColor);
  };

  return (
    <>
      <form className="flex" onSubmit={handleSubmit}>
        <input
          className={`${textColorClass} w-full duration-500 transition-colors placeholder-gray-500 text outline-none py-1 px-4 border-2 border-emerald-400 rounded-l-md`}
          type="text"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></input>
        <button
          type="submit"
          className="w-20 bg-emerald-400 text-white font-bold rounded-r-md"
        >
          add
        </button>
      </form>
    </>
  );
}
