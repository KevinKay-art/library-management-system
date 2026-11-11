
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  // CREATE a book
  async create(data: CreateBookDto) {
    const { totalCopies, ...bookData } = data;

    return this.prisma.book.create({
      data: {
        ...bookData,
        totalCopies,
        availableCopies: totalCopies,
      },
      include: { genre: true },
    });
  }

  // FIND all books with filtering, search and pagination
  async findAll(
    genreId?: number,
    search?: string,
    page = 1,
    limit = 10,
  ) {
    const where: Prisma.BookWhereInput = {};

    if (genreId) {
      where.genreId = genreId;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { author: { contains: search, mode: 'insensitive' } },
      ];
    }

    const skip = (page - 1) * limit;

    const [books, total] = await Promise.all([
      this.prisma.book.findMany({
        where,
        skip,
        take: limit,
        include: { genre: true },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.book.count({ where }),
    ]);

    return {
      data: books,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  // FIND one book
  async findOne(id: number) {
    const book = await this.prisma.book.findUnique({
      where: { id },
      include: { genre: true },
    });

    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return book;
  }

  // UPDATE a book
  async update(id: number, data: UpdateBookDto) {
    const existingBook = await this.findOne(id);
    const { totalCopies, ...bookData } = data;

    let availableCopies = existingBook.availableCopies;

    if (totalCopies !== undefined) {
      const borrowedCopies =
        existingBook.totalCopies - existingBook.availableCopies;

      if (totalCopies < borrowedCopies) {
        throw new BadRequestException(
          `Cannot set total copies below the ${borrowedCopies} copies currently borrowed`,
        );
      }

      availableCopies = totalCopies - borrowedCopies;
    }

    return this.prisma.book.update({
      where: { id },
      data: {
        ...bookData,
        ...(totalCopies !== undefined
          ? { totalCopies, availableCopies }
          : {}),
      },
      include: { genre: true },
    });
  }

  // DELETE a book
  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.book.delete({
      where: { id },
    });
  }
}
