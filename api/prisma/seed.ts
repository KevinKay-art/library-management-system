
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const genres = [
    { name: 'Fiction', description: 'Imaginary stories and novels' },
    { name: 'Science', description: 'Scientific knowledge and discoveries' },
    { name: 'History', description: 'Historical events and biographies' },
    { name: 'Technology', description: 'Computing and modern technology' },
  ];

  for (const genre of genres) {
    await prisma.genre.upsert({
      where: { name: genre.name },
      update: { description: genre.description },
      create: genre,
    });
  }

  const books = [
    { title: 'Things Fall Apart', author: 'Chinua Achebe', isbn: '9780385474542', publishedYear: 1958, genreName: 'Fiction' },
    { title: 'The River Between', author: 'Ngugi wa Thiong’o', isbn: '9780435905484', publishedYear: 1965, genreName: 'Fiction' },
    { title: 'Purple Hibiscus', author: 'Chimamanda Ngozi Adichie', isbn: '9781616202415', publishedYear: 2003, genreName: 'Fiction' },
    { title: 'The Alchemist', author: 'Paulo Coelho', isbn: '9780062315007', publishedYear: 1988, genreName: 'Fiction' },

    { title: 'A Brief History of Time', author: 'Stephen Hawking', isbn: '9780553380163', publishedYear: 1988, genreName: 'Science' },
    { title: 'Cosmos', author: 'Carl Sagan', isbn: '9780345539434', publishedYear: 1980, genreName: 'Science' },
    { title: 'The Selfish Gene', author: 'Richard Dawkins', isbn: '9780198788607', publishedYear: 1976, genreName: 'Science' },
    { title: 'Silent Spring', author: 'Rachel Carson', isbn: '9780618249060', publishedYear: 1962, genreName: 'Science' },

    { title: 'The Diary of a Young Girl', author: 'Anne Frank', isbn: '9780553296983', publishedYear: 1947, genreName: 'History' },
    { title: 'Long Walk to Freedom', author: 'Nelson Mandela', isbn: '9780316548182', publishedYear: 1994, genreName: 'History' },
    { title: 'The Guns of August', author: 'Barbara Tuchman', isbn: '9780345476098', publishedYear: 1962, genreName: 'History' },
    { title: 'Sapiens', author: 'Yuval Noah Harari', isbn: '9780062316097', publishedYear: 2011, genreName: 'History' },

    { title: 'Clean Code', author: 'Robert C. Martin', isbn: '9780132350884', publishedYear: 2008, genreName: 'Technology' },
    { title: 'The Pragmatic Programmer', author: 'Andrew Hunt', isbn: '9780135957059', publishedYear: 1999, genreName: 'Technology' },
    { title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', isbn: '9780262046305', publishedYear: 2022, genreName: 'Technology' },
    { title: 'The Innovators', author: 'Walter Isaacson', isbn: '9781476708690', publishedYear: 2014, genreName: 'Technology' },
  ];

  for (const book of books) {
    const genre = await prisma.genre.findUnique({
      where: { name: book.genreName },
    });

    if (!genre) {
      throw new Error(`Genre not found: ${book.genreName}`);
    }

    await prisma.book.upsert({
      where: { isbn: book.isbn },
      update: {},
      create: {
        title: book.title,
        author: book.author,
        isbn: book.isbn,
        publishedYear: book.publishedYear,
        genreId: genre.id,
      },
    });
  }

  console.log('Seed completed: 4 genres and 16 books.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
