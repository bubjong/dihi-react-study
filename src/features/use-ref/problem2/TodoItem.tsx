import { useState } from "react";

type TodoItemProps = {
  id: string;
  title: string;
};
export function TodoItem({ id, title }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(title);

  return (
    <div data-id={id}>
      <input type="checkbox" />
      {isEditing ? (
        <input
          autoFocus
          type="text"
          value={currentTitle}
          onChange={(e) => setCurrentTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setIsEditing(false);
              setCurrentTitle(title);
            }
          }}
        />
      ) : (
        <span onClick={() => setIsEditing(true)}>{title}</span>
      )}
      <button>삭제</button>
    </div>
  );
}
