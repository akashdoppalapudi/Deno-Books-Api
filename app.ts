import { Application, Context } from "https://deno.land/x/abc@v1.3.3/mod.ts";
import { config } from "https://deno.land/x/dotenv@v2.0.0/mod.ts";

import {
	get_all_books,
	get_book,
	add_book,
	delete_book,
} from "./controllers/bookController.ts";

const app = new Application();

const env = config();

//routes
app.get("/books", get_all_books)
	.get("/books/:id", get_book)
	.post("/books", add_book)
	.delete("/books/:id", delete_book);

//listen to port
app.start({ port: Number(env.PORT) });
