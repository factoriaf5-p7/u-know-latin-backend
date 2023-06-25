import { Test, TestingModule } from '@nestjs/testing';
import { ContentController } from './content.controller';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { ContentSchema } from '../schemas/content.schema';

const content = [
  {
    id: 'example-id',
    title: 'Example Title',
    description: 'Example Description',
    price: 10.99,
    create_at: '2023-06-21T10:00:00Z',
    update: '2023-06-21T10:00:00Z',
    category: 'Example Category',
    dificulty: 2,
    sales: true,
    created_at: '2023-06-21T10:00:00Z',
    content: 'Example Content',
  },
];

// describe ('ContentController', () => {
  // let controller: ContentController; 
  // const mockContentController = {
  //   findAll: jest.fn().mockImplementation(() => Promise.resolve({ content })), 
  //   create: newContent = {
  //     id: 2, 
  //     ...createContentDto, 
  //   }; 
  //   content.push(newContent); 
  //   return Promise.resolve(newContent); 
  // }


// })
