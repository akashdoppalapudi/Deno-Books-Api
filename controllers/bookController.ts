import { Context } from "https://deno.land/x/abc@v1.3.3/mod.ts";

import { Book } from "../models/bookModel.ts";

const getBooks = () => {
	const books = JSON.parse(Deno.readTextFileSync("database/db.json"));
	return books;
};

const writeBooks = async (books: Book[]) => {
	await Deno.writeTextFile(
		"database/db.json",
		JSON.stringify(books, null, "\t")
	);
};

export const get_all_books = (ctx: Context) => {
	const books = getBooks();
	return ctx.json(books, 200);
};

export const get_book = (ctx: Context) => {
	const books = getBooks();
	const id: number = Number(ctx.params.id);
	const book = books.find((b: Book) => b.id === id);
	if (book) {
		return ctx.json(book, 200);
	}
	return ctx.string("No book with that Id", 404);
};

export const add_book = async (ctx: Context) => {
	let books = getBooks();
	const body: any = await ctx.body;
	const book: Book = {
		id: books.length + 1,
		title: body.title,
		author: body.author,
	};
	books.push(book);
	writeBooks(books);

	return ctx.json(book, 201);
};

export const delete_book = (ctx: Context) => {
	let books = getBooks();
	const id: number = Number(ctx.params.id);
	const book = books.find((b: Book) => b.id === id);
	if (book) {
		books = books.filter((b: Book) => b.id !== id);
		writeBooks(books);
		return ctx.json(book, 200);
	}
	return ctx.string("No book with that Id", 404);
};
