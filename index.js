import { db } from "./db/index.js";
import { todosTable } from "./db/schema.js";
import { ilike, eq } from "drizzle-orm";
import OpenAI from "openai";

const openai = new OpenAI();

//Tools
async function getAllTodos() {
  const todos = await db.select().from(todosTable);
  return todos;
}

async function createTodo(todo) {
  await db.insert(todosTable).values({
    todo,
  });
}

async function searchTodo(search) {
  const todos = await db
    .select()
    .from(todosTable)
    .where(ilike(todosTable.todo, search));
  return todos;
}

async function deleteById(id) {
  await db.delete(todosTable).where(eq(todosTable.id, id));
}
