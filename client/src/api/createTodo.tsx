export default async function createTodo(description: string) {
  try {
    const body = { description };
    await fetch("/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  } catch (error) {
    console.log(error);
  }
}
