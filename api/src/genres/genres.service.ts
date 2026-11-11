
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GenresService {
  constructor(private prisma: PrismaService) {}

  // CREATE a new genre
  async create(data: { name: string; description?: string }) {
    return this.prisma.genre.create({
      data,
    });
  }

  // FIND all genres
  async findAll() {
    return this.prisma.genre.findMany({
      include: { books: true },
    });
  }

  // FIND one genre by ID
  async findOne(id: number) {
    const genre = await this.prisma.genre.findUnique({
      where: { id },
      include: { books: true },
    });

    if (!genre) {
      throw new NotFoundException(`Genre with ID ${id} not found`);
    }

    return genre;
  }

  // UPDATE a genre
  async update(
    id: number,
    data: { name?: string; description?: string },
  ) {
    await this.findOne(id);

    return this.prisma.genre.update({
      where: { id },
      data,
    });
  }

  // DELETE a genre
  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.genre.delete({
      where: { id },
    });
  }
}
