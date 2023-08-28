import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsRepository } from './posts.repository';
import { NotFoundException } from '@nestjs/common/exceptions'

@Injectable()
export class PostsService {

  constructor(private readonly repository: PostsRepository) {}

  async create(createPostDto: CreatePostDto) {
    return await this.repository.create(createPostDto);
  }

  async findAll() {
    return await this.repository.findAll();
  }

  async findOne(id: number) {
    const post = await this.repository.findOne(id);
    if(!post) throw new NotFoundException("There is no matching record with this id");

    return post;
  }

  async update(id: number, createPostDto: CreatePostDto) {
    const post = await this.repository.findOne(id);
    if(!post) throw new NotFoundException("There is no matching record with this id");

    return await this.repository.update(id, createPostDto);
  }

  async remove(id: number) {
    const post = await this.repository.findOne(id);
    if(!post) throw new NotFoundException("There is no matching record with this id");
    
    return await this.repository.remove(id);
  }
}
